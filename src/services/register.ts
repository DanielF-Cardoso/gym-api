import { UsersRepository } from '@/repositories/users-repository'
import { UserAlreadyExists } from './errors/user-already-exists'
import bcrypt from 'bcryptjs'
import { User } from '@prisma/client'

interface RegisterServicesProps {
  name: string
  email: string
  password: string
}

interface RegisterServicesResponse {
  user: User
}

export class RegisterServices {
  constructor(private usersRepository: UsersRepository) { }

  async execute({ name, email, password }: RegisterServicesProps): Promise<RegisterServicesResponse> {
    const password_hash = await bcrypt.hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExists()
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    })

    return { user }
  }
}
