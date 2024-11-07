import { FastifyInstance } from 'fastify'
import { register } from './controllers/register'

export async function httpRoutes(app: FastifyInstance) {
  app.post('/users', register)
}
