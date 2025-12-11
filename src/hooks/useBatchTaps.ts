import { useState, useRef } from 'react'

import { roundsApi } from '@/api/rounds'

interface UseBatchTapsOptions {
  roundId: string | undefined
  canTap: boolean
}

export const useBatchTaps = ({ roundId, canTap }: UseBatchTapsOptions) => {
  const [localTaps, setLocalTaps] = useState(0)
  const [serverScore, setServerScore] = useState(0)
  const lastSyncScore = useRef(0)
  const isInitialized = useRef(false)
  const currentRoundId = useRef<string | undefined>(undefined)

  const handleTap = async () => {
    if (!canTap || !roundId) return

    setLocalTaps((prev) => prev + 1)

    try {
      const response = await roundsApi.tap(roundId)
      setServerScore(response.score)
      lastSyncScore.current = response.score
    } catch (err) {
      setLocalTaps((prev) => prev - 1)
      setServerScore(lastSyncScore.current)
      console.error('Failed to send tap:', err)
    }
  }

  const initializeScore = (score: number, taps: number = 0) => {
    if (currentRoundId.current !== roundId) {
      currentRoundId.current = roundId
      isInitialized.current = false
    }
    if (!isInitialized.current) {
      setServerScore(score)
      setLocalTaps(taps)
      lastSyncScore.current = score
      isInitialized.current = true
    }
  }

  return {
    handleTap,
    localScore: serverScore,
    localTaps,
    initializeScore,
  }
}
