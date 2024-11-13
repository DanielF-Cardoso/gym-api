import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { SearchGymsServices } from './search-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsServices

describe('Search Gyms', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsServices(gymsRepository)
  })

  it('should be able to search for gym', async () => {
    await gymsRepository.create({
      name: 'Test Gym',
      description: 'Gym 1 description',
      phone: '123456',
      latitude: -19.9024575,
      longitude: -43.9365046,
    })

    await gymsRepository.create({
      name: 'Apollo Gym',
      description: 'Gym 2 description',
      phone: '123456',
      latitude: -19.9199746,
      longitude: -43.9894349,
    })

    const { gyms } = await sut.execute({
      query: 'Test',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ name: 'Test Gym' })])
  })

  it('should be able to fetch paginated gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        name: `Test Gym ${i}`,
        description: null,
        phone: '123456',
        latitude: -19.9024575,
        longitude: -43.9365046,
      })
    }

    const { gyms } = await sut.execute({
      query: 'Test Gym',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ name: 'Test Gym 21' }),
      expect.objectContaining({ name: 'Test Gym 22' }),
    ])
  })
})
