import { useEffect, useMemo, useState } from 'react'

import { Box, VStack } from '@chakra-ui/react'
import { useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

import { useRound } from '@/api/rounds'
import { ErrorState } from '@/components/ErrorState'
import { Goose } from '@/components/Goose'
import { Header } from '@/components/Header'
import { LoadingState } from '@/components/LoadingState'
import { RoundInfo } from '@/components/RoundInfo'
import { Timer } from '@/components/Timer'
import { useBatchTaps } from '@/hooks/useBatchTaps'
import { useRoundTimer } from '@/hooks/useRoundTimer'
import { useUserSync } from '@/hooks/useUserSync'
import { useStore } from '@/store'
import { getHeaderStatusTextByStatus } from '@/utils/roundFormat'
import type { RoundStatus } from '@/utils/roundUtils'
import { getRoundStatus } from '@/utils/roundUtils'

import {
  roundContentStyles,
  roundContentVStackAlign,
  roundContentVStackSpacing,
  roundPageContainerStyles,
} from './Round.styles'

function Round() {
  const { id } = useParams<{ id: string }>()
  const user = useUserSync()
  const queryClient = useQueryClient()
  const getRoundStats = useStore((state) => state.getRoundStats)
  const clearRoundStats = useStore((state) => state.clearRoundStats)
  const [currentStatus, setCurrentStatus] = useState<RoundStatus>('pending')

  const { data: roundData, isLoading, error } = useRound(id || '', currentStatus)

  const batchTaps = useBatchTaps({
    roundId: id,
    canTap: true,
  })

  const onRoundEnd = async () => {
    if (id) {
      queryClient.invalidateQueries({ queryKey: ['round', id] })
      clearRoundStats(id)
    }
  }

  const onStatusChange = (status: RoundStatus) => {
    setCurrentStatus(status)
  }

  const { timeLeft, canTap } = useRoundTimer({
    round: roundData?.round,
    onStatusChange,
    onRoundEnd,
  })

  useEffect(() => {
    if (roundData?.round) {
      const calculatedStatus = getRoundStatus(roundData.round)
      setCurrentStatus(calculatedStatus)
    }
  }, [roundData?.round])

  useEffect(() => {
    if (roundData?.myStats && roundData.round) {
      const status = getRoundStatus(roundData.round)
      if (status === 'completed') {
        clearRoundStats(roundData.round.id)
      } else if (status === 'active' || status === 'pending') {
        const storedStats = getRoundStats(roundData.round.id)
        if (storedStats) {
          batchTaps.initializeScore(storedStats.score, storedStats.taps)
        } else {
          batchTaps.initializeScore(roundData.myStats.score, roundData.myStats.taps || 0)
        }
      }
    }
  }, [roundData?.myStats, roundData?.round, batchTaps, getRoundStats, clearRoundStats])

  const headerTitle = useMemo(() => {
    return getHeaderStatusTextByStatus(currentStatus)
  }, [currentStatus])

  const memoizedHeader = useMemo(
    () => <Header title={headerTitle} user={user} showBackButton={true} />,
    [headerTitle, user],
  )

  if (isLoading) {
    return <LoadingState message="Загрузка..." />
  }

  if (error || !roundData) {
    return <ErrorState message="Ошибка загрузки раунда" />
  }

  const isActive = currentStatus === 'active'
  const displayScore = isActive ? batchTaps.localScore : (roundData.myStats?.score ?? 0)
  const localTaps = isActive ? batchTaps.localTaps : undefined

  return (
    <Box sx={roundPageContainerStyles}>
      {memoizedHeader}

      <Box sx={roundContentStyles}>
        <VStack spacing={roundContentVStackSpacing} align={roundContentVStackAlign}>
          <Goose onClick={batchTaps.handleTap} isActive={isActive} canTap={canTap} />

          {(currentStatus === 'active' || currentStatus === 'pending') && (
            <Timer timeLeft={timeLeft} />
          )}

          <RoundInfo
            status={currentStatus}
            displayScore={displayScore}
            localTaps={localTaps}
            roundData={roundData}
          />
        </VStack>
      </Box>
    </Box>
  )
}

export default Round
