import { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'
import { UserAlreadyExists } from './errors/user-already-exists'

interface RegisterServicesProps {
  name: string
  email: string
  password: string
}

export class RegisterServices {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ name, email, password }: RegisterServicesProps) {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExists()
    }

    await this.usersRepository.create({
      name,
      email,
      password_hash,
    })
  }
}
