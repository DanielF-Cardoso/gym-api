import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { CheckInService } from './check-in'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxDistanceError } from './errors/max-distance'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-in'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInService

describe('Check-in Service', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInService(checkInsRepository, gymsRepository)

    await gymsRepository.create({
      id: '1',
      name: 'Gym 1',
      description: 'Gym 1 description',
      phone: '123456789',
      latitude: new Decimal(-15.9047629),
      longitude: new Decimal(-47.7733597),
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      userId: '1',
      gymId: '1',
      userLatitute: -15.9047629,
      userLongitude: -47.7733597,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date('2024-11-10 10:00:00'))

    await sut.execute({
      userId: '1',
      gymId: '1',
      userLatitute: -15.9047629,
      userLongitude: -47.7733597,
    })
    expect(() =>
      sut.execute({
        userId: '1',
        gymId: '1',
        userLatitute: -15.9047629,
        userLongitude: -47.7733597,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  it('should be able to check in twice in different days', async () => {
    vi.setSystemTime(new Date('2024-11-10 10:00:00'))

    await sut.execute({
      userId: '1',
      gymId: '1',
      userLatitute: -15.9047629,
      userLongitude: -47.7733597,
    })

    vi.setSystemTime(new Date('2024-11-11 10:00:00'))

    const { checkIn } = await sut.execute({
      userId: '1',
      gymId: '1',
      userLatitute: -15.9047629,
      userLongitude: -47.7733597,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on distant gym', async () => {
    gymsRepository.items.push({
      id: '2',
      name: 'Gym 2',
      description: 'Gym 2 description',
      phone: '123456789',
      latitude: new Decimal(-15.797237),
      longitude: new Decimal(-47.9219781),
    })

    expect(() =>
      sut.execute({
        userId: '1',
        gymId: '1',
        userLatitute: -15.3047629,
        userLongitude: -47.733597,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
