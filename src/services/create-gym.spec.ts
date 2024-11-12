import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymServices } from './create-gym'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymServices

describe('Register Gym', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymServices(gymsRepository)
  })
  it('should be able to register', async () => {
    const { gym } = await sut.execute({
      name: 'John Doe',
      description: 'Description',
      phone: '123456',
      latitude: -15.9047629,
      longitude: -47.7733597,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
