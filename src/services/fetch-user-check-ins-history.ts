import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { Checkin } from '@prisma/client'

interface FetchUserCheckInsRequest {
  userId: string
  page: number
}

interface FetchUserCheckInsResponse {
  checkIns: Checkin[]
}

export class FetchUserCheckInsService {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    page,
  }: FetchUserCheckInsRequest): Promise<FetchUserCheckInsResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page,
    )

    return {
      checkIns,
    }
  }
}
