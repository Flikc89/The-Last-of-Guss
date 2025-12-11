import dayjs from 'dayjs'

import type { Round } from '@/api/types'

import { getRoundStatus } from './roundUtils'

export const getHeaderStatusText = (round: Round | undefined): string => {
  if (!round) return 'Загрузка...'
  const status = getRoundStatus(round)
  const statusMap: Record<string, string> = {
    pending: 'Раунд не начат',
    active: 'Раунд активен',
    completed: 'Раунд завершен',
  }
  return statusMap[status] || 'Неизвестно'
}

export const getCooldownStatus = (round: Round | undefined): boolean => {
  if (!round) return false
  const status = getRoundStatus(round)
  if (status !== 'completed') return false
  const now = dayjs()
  const endTime = dayjs(round.endTime)
  const cooldownEnd = endTime.add(30, 'second')
  return now.isBefore(cooldownEnd)
}

export const getRoundStatusText = (round: Round): string => {
  const status = getRoundStatus(round)
  const statusMap: Record<string, string> = {
    pending: 'Запланирован',
    active: 'Активен',
    completed: 'Завершен',
  }
  return statusMap[status] || 'Неизвестно'
}

export const getRoundStatusColor = (round: Round): string => {
  const status = getRoundStatus(round)
  const colorMap: Record<string, string> = {
    pending: 'yellow',
    active: 'green',
    completed: 'gray',
  }
  return colorMap[status] || 'gray'
}
