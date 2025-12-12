import { useEffect, useState, useRef } from 'react'

import dayjs from 'dayjs'

import type { Round } from '@/api/types'
import type { RoundStatus } from '@/utils/roundUtils'
import { getRoundStatus } from '@/utils/roundUtils'

const DEFAULT_TIME = '00:00'

interface UseRoundTimerOptions {
  round: Round | undefined
  onStatusChange?: (status: RoundStatus) => void
  onRoundEnd?: () => void
}

const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
}

export const useRoundTimer = ({ round, onStatusChange, onRoundEnd }: UseRoundTimerOptions) => {
  const [timeLeft, setTimeLeft] = useState<string>(DEFAULT_TIME)
  const [canTap, setCanTap] = useState(false)
  const hasCalledOnRoundEndRef = useRef(false)
  const lastStatusRef = useRef<RoundStatus | null>(null)
  const onStatusChangeRef = useRef(onStatusChange)
  const onRoundEndRef = useRef(onRoundEnd)

  useEffect(() => {
    onStatusChangeRef.current = onStatusChange
    onRoundEndRef.current = onRoundEnd
  }, [onStatusChange, onRoundEnd])

  useEffect(() => {
    const resetTimer = () => {
      setTimeLeft(DEFAULT_TIME)
      setCanTap(false)
    }

    const callOnRoundEndOnce = () => {
      if (!hasCalledOnRoundEndRef.current) {
        onRoundEndRef.current?.()
        hasCalledOnRoundEndRef.current = true
      }
    }

    const updateTimeFromDiff = (diff: number, canTapValue: boolean) => {
      setTimeLeft(diff > 0 ? formatTime(diff) : DEFAULT_TIME)
      setCanTap(canTapValue)
    }

    if (!round) {
      resetTimer()
      hasCalledOnRoundEndRef.current = false
      lastStatusRef.current = null
      return
    }

    const updateTimer = () => {
      const now = dayjs()
      const status = getRoundStatus(round)

      if (lastStatusRef.current !== status) {
        lastStatusRef.current = status
        onStatusChangeRef.current?.(status)
        hasCalledOnRoundEndRef.current = false
      }

      if (status === 'active') {
        const diff = dayjs(round.endTime).diff(now, 'second')
        updateTimeFromDiff(diff, diff > 0)

        if (diff <= 0) {
          callOnRoundEndOnce()
        }
      } else if (status === 'pending') {
        const diff = dayjs(round.startTime).diff(now, 'second')
        updateTimeFromDiff(diff, false)
      } else {
        resetTimer()
        callOnRoundEndOnce()
      }
    }

    updateTimer()
    const interval = setInterval(updateTimer, 1000)

    return () => clearInterval(interval)
  }, [round])

  return { timeLeft, canTap }
}
