import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { FetchUserCheckInsService } from './fetch-user-check-ins-history'

let checkInsRepository: InMemoryCheckInsRepository
let sut: FetchUserCheckInsService

describe('Fetch User Check-In History Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new FetchUserCheckInsService(checkInsRepository)
  })

  it('should be able to fetch check-in history', async () => {
    await checkInsRepository.create({
      user_id: '1',
      gym_id: '1',
    })
    await checkInsRepository.create({
      user_id: '1',
      gym_id: '2',
    })

    const { checkIns } = await sut.execute({
      userId: '1',
      page: 1,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: '1' }),
      expect.objectContaining({ gym_id: '2' }),
    ])
  })

  it('should be able to fetch paginated check-in history', async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInsRepository.create({
        user_id: '1',
        gym_id: i.toString(),
      })
    }

    const { checkIns } = await sut.execute({
      userId: '1',
      page: 2,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: '21' }),
      expect.objectContaining({ gym_id: '22' }),
    ])
  })
})
