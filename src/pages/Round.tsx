import { useEffect, useState } from 'react'

import { Box, VStack } from '@chakra-ui/react'
import { useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

import { useRound } from '@/api/rounds'
import { ErrorState } from '@/components/ErrorState'
import { Goose } from '@/components/Goose'
import { Header } from '@/components/Header'
import { LoadingState } from '@/components/LoadingState'
import { RoundInfo } from '@/components/RoundInfo'
import { useBatchTaps } from '@/hooks/useBatchTaps'
import { useRoundTimer } from '@/hooks/useRoundTimer'
import { useUserSync } from '@/hooks/useUserSync'
import { getCooldownStatus, getHeaderStatusText } from '@/utils/roundFormat'
import { getRoundStatus } from '@/utils/roundUtils'

import {
  roundContentStyles,
  roundContentVStackStyles,
  roundPageContainerStyles,
} from './Round.styles'

function Round() {
  const { id } = useParams<{ id: string }>()
  const user = useUserSync()
  const queryClient = useQueryClient()
  const [currentStatus, setCurrentStatus] = useState<'pending' | 'active' | 'completed'>('pending')

  const isActive = currentStatus === 'active'

  const { data: roundData, isLoading, error } = useRound(id || '', currentStatus)

  const batchTaps = useBatchTaps({
    roundId: id,
    canTap: true,
  })

  const { timeLeft, canTap } = useRoundTimer({
    round: roundData?.round,
    onStatusChange: setCurrentStatus,
    onRoundEnd: async () => {
      if (id) {
        queryClient.invalidateQueries({ queryKey: ['round', id] })
      }
    },
  })

  useEffect(() => {
    if (roundData?.round && currentStatus === 'pending') {
      const initialStatus = getRoundStatus(roundData.round)
      setCurrentStatus(initialStatus)
    }
  }, [roundData?.round, currentStatus])

  useEffect(() => {
    if (roundData?.myStats && roundData.round) {
      const status = getRoundStatus(roundData.round)
      if (status === 'active' || status === 'pending') {
        batchTaps.initializeScore(roundData.myStats.score, roundData.myStats.taps || 0)
      }
    }
  }, [roundData?.myStats, roundData?.round, batchTaps])

  if (isLoading) {
    return <LoadingState message="Загрузка..." />
  }

  if (error || !roundData) {
    return <ErrorState message="Ошибка загрузки раунда" />
  }

  const round = roundData.round
  const status = currentStatus

  const displayScore = status === 'active' ? batchTaps.localScore : roundData.myStats.score
  const localTaps = status === 'active' ? batchTaps.localTaps : undefined

  const getHeaderTitle = () => {
    if (status === 'completed') {
      return getCooldownStatus(round) ? 'Cooldown' : 'Раунд завершен'
    }
    return getHeaderStatusText(round)
  }

  const headerTitle = getHeaderTitle()

  return (
    <Box {...roundPageContainerStyles}>
      <Header title={headerTitle} user={user} showBackButton={true} />

      <Box {...roundContentStyles}>
        <VStack {...roundContentVStackStyles}>
          <Goose onClick={batchTaps.handleTap} isActive={isActive} canTap={canTap} />

          <RoundInfo
            status={status}
            timeLeft={timeLeft}
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
