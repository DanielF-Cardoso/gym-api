import fastify from 'fastify'
import { httpRoutes } from './http/routes'

export const app = fastify()

app.register(httpRoutes)
