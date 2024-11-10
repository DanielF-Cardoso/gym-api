import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { Checkin } from '@prisma/client'

interface CheckInRequest {
  userId: string
  gymId: string
}

interface CheckInResponse {
  checkIn: Checkin
}

export class CheckInService {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({ userId, gymId }: CheckInRequest): Promise<CheckInResponse> {
    const checkIn = await this.checkInsRepository.create({
      gym_id: gymId,
      user_id: userId,
    })

    return {
      checkIn,
    }
  }
}
