import { expect, describe, it } from 'vitest'
import { RegisterServices } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExists } from './errors/user-already-exists'

describe('Register Services', () => {
    it('should be able to register', async () => {
        const usersRepository = new InMemoryUsersRepository()
        const registerServices = new RegisterServices(usersRepository)

        const { user } = await registerServices.execute({
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password: '123456'
        })

        expect(user.id).toEqual(expect.any(String))
    }),
    it('should hash user password upon registrarion', async () => {
            const usersRepository = new InMemoryUsersRepository()
            const registerServices = new RegisterServices(usersRepository)

            const { user } = await registerServices.execute({
                name: 'John Doe',
                email: 'johndoe@gmail.com',
                password: '123456'
            })

            const isPasswordHashed = await compare('123456', user.password_hash)

            expect(isPasswordHashed).toBe(true)
    }),
    it('should not be able to register with same email twice', async () => {
            const usersRepository = new InMemoryUsersRepository()
            const registerServices = new RegisterServices(usersRepository)

            const email = 'johndoe@gmail.com'

            await registerServices.execute({
                name: 'John Doe',
                email,
                password: '123456'
            })

            await expect(() =>
                registerServices.execute({
                    name: 'John Doe',
                    email,
                    password: '123456'
                })
            ).rejects.toBeInstanceOf(UserAlreadyExists)

    })
})