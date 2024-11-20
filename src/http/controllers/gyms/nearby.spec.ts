import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from 'utils/test/create-and-authenticate-user'

describe('Nearby Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to list nearby gym', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Gym Test',
        description: 'Gym Test Description',
        phone: '123456789',
        latitude: -19.9024575,
        longitude: -43.9365046,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Another Gym',
        description: 'Gym Test Description',
        phone: '123456789',
        latitude: -19.9199746,
        longitude: -44.9894349,
      })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: -19.9024575,
        longitude: -43.9365046,
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.status).toBe(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        name: 'Gym Test',
      }),
    ])
  })
})
