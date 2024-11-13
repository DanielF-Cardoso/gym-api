import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { FetchNearbyGymsServices } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsServices

describe('Fetch Nearby Gyms', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsServices(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      name: 'Near Gym',
      description: 'Gym 1 description',
      phone: '123456',
      latitude: -19.9024575,
      longitude: -43.9365046,
    })

    await gymsRepository.create({
      name: 'Far Gym',
      description: 'Gym 2 description',
      phone: '123456',
      latitude: -19.9199746,
      longitude: -44.9894349,
    })

    const { gyms } = await sut.execute({
      userLatitude: -19.9024575,
      userLongitude: -43.9365046,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ name: 'Near Gym' })])
  })
})
