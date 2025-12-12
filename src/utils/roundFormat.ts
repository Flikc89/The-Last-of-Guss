import type { Round } from '@/api/types'

import type { RoundStatus } from './roundUtils'
import { getRoundStatus } from './roundUtils'

const UNKNOWN_STATUS_TEXT = 'Неизвестно'

const HEADER_STATUS_MAP: Record<RoundStatus, string> = {
  pending: 'Раунд не начат',
  active: 'Раунд активен',
  completed: 'Раунд завершен',
}

const CARD_STATUS_MAP: Record<RoundStatus, string> = {
  pending: 'Запланирован',
  active: 'Активен',
  completed: 'Завершен',
}

const INFO_STATUS_MAP: Record<RoundStatus, string> = {
  pending: 'Раунд еще не начат',
  active: 'Раунд активен!',
  completed: 'Раунд завершен',
}

const STATUS_COLOR_MAP: Record<RoundStatus, string> = {
  pending: 'yellow',
  active: 'green',
  completed: 'gray',
}

export const getHeaderStatusTextByStatus = (status: RoundStatus): string => {
  return HEADER_STATUS_MAP[status] || UNKNOWN_STATUS_TEXT
}

export const getInfoStatusText = (status: RoundStatus): string => {
  return INFO_STATUS_MAP[status] || UNKNOWN_STATUS_TEXT
}

export const getRoundStatusText = (round: Round): string => {
  const status = getRoundStatus(round)
  return CARD_STATUS_MAP[status] || UNKNOWN_STATUS_TEXT
}

export const getRoundStatusColor = (round: Round): string => {
  const status = getRoundStatus(round)
  return STATUS_COLOR_MAP[status] || 'gray'
}
