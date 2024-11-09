import { UsersRepository } from '@/repositories/users-repository'
import { InvalidCredentialsError } from './errors/invalid-credentials'
import bcrypt from 'bcryptjs'
import { User } from '@prisma/client'

interface AuthenticateRequest {
    email: string
    password: string
}

interface AuthenticateResponse {
    user: User
}

export class AuthenticateService {
    constructor(private usersRepository: UsersRepository) { }

    async execute({
        email,
        password,
    }: AuthenticateRequest): Promise<AuthenticateResponse> {
        const user = await this.usersRepository.findByEmail(email)

        if (!user) {
            throw new InvalidCredentialsError()
        }

        const doesPasswordMatch = await bcrypt.compare(password, user.password_hash)

        if (!doesPasswordMatch) {
            throw new InvalidCredentialsError()
        }

        return {
            user,
        }
    }
}
