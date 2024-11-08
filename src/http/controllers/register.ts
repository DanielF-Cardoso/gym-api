import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { RegisterServices } from '@/services/register'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { UserAlreadyExists } from '@/services/errors/user-already-exists'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  try {
    const usersRepository = new PrismaUsersRepository()
    const registerServices = new RegisterServices(usersRepository)

    await registerServices.execute({ 
      name, 
      email, 
      password 
    })
  } catch (err) {
    if (err instanceof UserAlreadyExists) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
