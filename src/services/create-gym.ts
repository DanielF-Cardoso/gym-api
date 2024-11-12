import { Gym } from '@prisma/client'
import { GymsRepository } from '@/repositories/gyms-repository'

interface CreateGymServicesProps {
  name: string
  description?: string | null
  phone?: string | null
  latitude: number
  longitude: number
}

interface CreateGymServicesResponse {
  gym: Gym
}

export class CreateGymServices {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    name,
    description,
    phone,
    latitude,
    longitude,
  }: CreateGymServicesProps): Promise<CreateGymServicesResponse> {
    const gym = await this.gymsRepository.create({
      name,
      description,
      phone,
      latitude,
      longitude,
    })

    return { gym }
  }
}
