import { Gym, Prisma } from '@prisma/client'

export interface findNearbyParams {
  latitude: number
  longitude: number
}

export interface GymsRepository {
  findById(id: string): Promise<Gym | null>
  searchMany(query: string, page: number): Promise<Gym[]>
  findNearby(params: findNearbyParams): Promise<Gym[]>
  create(data: Prisma.GymCreateInput): Promise<Gym>
}
