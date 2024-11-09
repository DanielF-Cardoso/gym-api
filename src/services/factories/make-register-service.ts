import { RegisterServices } from '../register'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

export function makeRegisterService() {
  const usersRepository = new PrismaUsersRepository()
  const registerServices = new RegisterServices(usersRepository)

  return registerServices
}
