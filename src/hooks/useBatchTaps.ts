import { useState, useRef, useEffect } from 'react'

import { roundsApi } from '@/api/rounds'
import { useStore } from '@/store'

interface UseBatchTapsOptions {
  roundId: string | undefined
  canTap: boolean
}

export const useBatchTaps = ({ roundId, canTap }: UseBatchTapsOptions) => {
  const setRoundStats = useStore((state) => state.setRoundStats)
  const getRoundStats = useStore((state) => state.getRoundStats)
  const [localTaps, setLocalTaps] = useState(0)
  const [serverScore, setServerScore] = useState(0)
  const lastSyncScore = useRef(0)
  const currentRoundId = useRef<string | undefined>(undefined)

  const updateStats = (score: number, taps: number, persistToStore: boolean = true) => {
    setLocalTaps(taps)
    setServerScore(score)
    lastSyncScore.current = score
    if (persistToStore && roundId) {
      setRoundStats(roundId, { score, taps })
    }
  }

  const resetStats = () => {
    updateStats(0, 0, false)
  }

  useEffect(() => {
    if (roundId && roundId !== currentRoundId.current) {
      currentRoundId.current = roundId
      const storedStats = getRoundStats(roundId)
      if (storedStats) {
        updateStats(storedStats.score, storedStats.taps, false)
      } else {
        resetStats()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roundId, getRoundStats])

  const handleTap = async () => {
    if (!canTap || !roundId) return

    const optimisticTaps = localTaps + 1
    updateStats(serverScore, optimisticTaps)

    try {
      const response = await roundsApi.tap(roundId)
      updateStats(response.score, optimisticTaps)
    } catch (err) {
      const rollbackTaps = optimisticTaps - 1
      updateStats(lastSyncScore.current, rollbackTaps)
      console.error('Failed to send tap:', err)
    }
  }

  const initializeScore = (score: number, taps: number = 0) => {
    if (currentRoundId.current !== roundId) {
      currentRoundId.current = roundId
    }
    const storedStats = roundId ? getRoundStats(roundId) : undefined
    if (storedStats) {
      updateStats(storedStats.score, storedStats.taps, false)
    } else {
      updateStats(score, taps, true)
    }
  }

  return {
    handleTap,
    localScore: serverScore,
    localTaps,
    initializeScore,
  }
}
