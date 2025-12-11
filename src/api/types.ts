export type UserRole = 'SURVIVOR' | 'NIKITA' | 'ADMIN'

export interface User {
  username: string
  role: UserRole
}

export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse {
  username: string
  role: UserRole
  token: string
}

export interface Round {
  id: string
  startTime: string
  endTime: string
  totalScore: number
  createdAt: string
}

export type RoundStatusFilter = 'active' | 'cooldown' | 'finished'

export interface RoundsQueryParams {
  cursor?: string
  limit?: number
  status?: RoundStatusFilter
}

export interface Pagination {
  limit: number
  nextCursor: string | null
  hasMore: boolean
}

export interface RoundsResponse {
  data: Round[]
  pagination: Pagination
}

export interface TopStat {
  taps: number
  score: number
  user: {
    username: string
  }
}

export interface MyStat {
  taps: number
  score: number
}

export interface RoundDetailsResponse {
  round: Round
  topStats: TopStat[]
  myStats: MyStat
}

export interface TapResponse {
  taps: number
  score: number
}

export interface ApiError {
  message: string
}
