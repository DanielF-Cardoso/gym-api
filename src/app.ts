import fastify from 'fastify'
import { httpRoutes } from './http/routes'
import { ZodError } from 'zod'
import { env } from './env'

export const app = fastify()

app.register(httpRoutes)

app.setErrorHandler((error, request, reply) => {
    if (error instanceof ZodError) {
        return reply
        .status(400)
        .send({ message: 'Validation failed', inssues: error.format() })
    }

    if (env.NODE_ENV === 'production') {
        console.error(error)
    }

    return reply.status(500).send({ message: 'Internal server error' })
})