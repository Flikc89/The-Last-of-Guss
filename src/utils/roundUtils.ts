import dayjs from 'dayjs'

import type { Round } from '@/api/types'

export type RoundStatus = 'pending' | 'active' | 'completed'

export const getRoundStatus = (round: Round): RoundStatus => {
  const now = dayjs()
  const startTime = dayjs(round.startTime)
  const endTime = dayjs(round.endTime)

  if (now.isBefore(startTime)) {
    return 'pending'
  }

  if (
    (now.isAfter(startTime) && now.isBefore(endTime)) ||
    now.isSame(startTime) ||
    now.isSame(endTime)
  ) {
    return 'active'
  }

  return 'completed'
}
