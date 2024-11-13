import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { GetUserMetricsService } from './get-user-metrics'

let checkInsRepository: InMemoryCheckInsRepository
let sut: GetUserMetricsService

describe('Get User Metrics Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new GetUserMetricsService(checkInsRepository)
  })

  it('should be able to get check-ins count from metrics', async () => {
    await checkInsRepository.create({
      user_id: '1',
      gym_id: '1',
    })
    await checkInsRepository.create({
      user_id: '1',
      gym_id: '2',
    })

    const { checkInsCount } = await sut.execute({
      userId: '1',
    })

    expect(checkInsCount).toEqual(2)
  })
})
