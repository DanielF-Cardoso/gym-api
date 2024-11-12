import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { GymsRepository } from '@/repositories/gyms-repository'
import { Checkin } from '@prisma/client'
import { ResourceNotFound } from './errors/resource-not-found'
import { getDistanceBetweenCoordinates } from 'utils/get-distance-between-coordinates'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-in'
import { MaxDistanceError } from './errors/max-distance'

interface CheckInRequest {
  userId: string
  gymId: string
  userLatitute: number
  userLongitude: number
}

interface CheckInResponse {
  checkIn: Checkin
}

export class CheckInService {
  constructor(
    private checkInsRepository: CheckInsRepository,
    private gymsRepository: GymsRepository,
  ) {}

  async execute({
    userId,
    gymId,
    userLatitute,
    userLongitude,
  }: CheckInRequest): Promise<CheckInResponse> {
    const gym = await this.gymsRepository.findById(gymId)

    if (!gym) {
      throw new ResourceNotFound()
    }

    const distance = getDistanceBetweenCoordinates(
      { latitude: userLatitute, longitude: userLongitude },
      {
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber(),
      },
    )

    const MAX_DISTANCE_IN_KILOMETERS = 0.1 // 100 meters

    if (distance > MAX_DISTANCE_IN_KILOMETERS) {
      throw new MaxDistanceError()
    }

    const checkInOnSameDate = await this.checkInsRepository.findByUserIdOnDate(
      userId,
      new Date(),
    )

    if (checkInOnSameDate) {
      throw new MaxNumberOfCheckInsError()
    }

    const checkIn = await this.checkInsRepository.create({
      gym_id: gymId,
      user_id: userId,
    })

    return {
      checkIn,
    }
  }
}
