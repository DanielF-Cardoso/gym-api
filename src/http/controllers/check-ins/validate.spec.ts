import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from 'utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('Validate Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to validate a check-in', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const user = await prisma.user.findFirstOrThrow()

    const gym = await prisma.gym.create({
      data: {
        name: 'Gym Test',
        latitude: -19.9199746,
        longitude: -44.9894349,
      },
    })

    let checkIn = await prisma.checkin.create({
      data: {
        user_id: user.id,
        gym_id: gym.id,
      },
    })

    const response = await request(app.server)
      .patch(`/check-ins/${checkIn.id}/validate`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    console.log(response.body)

    expect(response.status).toBe(204)

    checkIn = await prisma.checkin.findUniqueOrThrow({
      where: {
        id: checkIn.id,
      },
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
  })
})
