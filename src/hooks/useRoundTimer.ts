import { useEffect, useState } from 'react'

import dayjs from 'dayjs'

import type { Round } from '@/api/types'
import { getRoundStatus } from '@/utils/roundUtils'

interface UseRoundTimerOptions {
  round: Round | undefined
  onStatusChange?: (status: 'pending' | 'active' | 'completed') => void
  onRoundEnd?: () => void
}

export const useRoundTimer = ({ round, onStatusChange, onRoundEnd }: UseRoundTimerOptions) => {
  const [timeLeft, setTimeLeft] = useState<string>('00:00')
  const [canTap, setCanTap] = useState(false)
  const [secondsLeft, setSecondsLeft] = useState<number | undefined>(undefined)
  const [hasCalledOnRoundEnd, setHasCalledOnRoundEnd] = useState(false)

  useEffect(() => {
    if (!round) return

    const updateTimer = () => {
      const now = dayjs()
      const endTime = dayjs(round.endTime)
      const startTime = dayjs(round.startTime)
      const status = getRoundStatus(round)

      onStatusChange?.(status)

      if (status === 'active') {
        const diff = endTime.diff(now, 'second')
        if (diff > 0) {
          const minutes = Math.floor(diff / 60)
          const seconds = diff % 60
          setTimeLeft(`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`)
          setSecondsLeft(diff)
          setCanTap(true)
          setHasCalledOnRoundEnd(false)
        } else {
          setTimeLeft('00:00')
          setSecondsLeft(0)
          setCanTap(false)
          if (!hasCalledOnRoundEnd) {
            onRoundEnd?.()
            setHasCalledOnRoundEnd(true)
          }
        }
      } else if (status === 'pending') {
        const diff = startTime.diff(now, 'second')
        if (diff > 0) {
          const minutes = Math.floor(diff / 60)
          const seconds = diff % 60
          setTimeLeft(`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`)
          setSecondsLeft(undefined)
          setCanTap(false)
        } else {
          setTimeLeft('00:00')
          setSecondsLeft(undefined)
        }
        setHasCalledOnRoundEnd(false)
      } else {
        setTimeLeft('00:00')
        setSecondsLeft(undefined)
        setCanTap(false)
        if (!hasCalledOnRoundEnd) {
          onRoundEnd?.()
          setHasCalledOnRoundEnd(true)
        }
      }
    }

    updateTimer()
    const interval = setInterval(updateTimer, 1000)

    return () => clearInterval(interval)
  }, [round, onStatusChange, onRoundEnd, hasCalledOnRoundEnd])

  return { timeLeft, canTap, secondsLeft }
}
