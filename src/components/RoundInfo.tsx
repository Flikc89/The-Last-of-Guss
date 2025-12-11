import { Text, VStack } from '@chakra-ui/react'

import type { RoundDetailsResponse } from '@/api/types'

import {
  roundInfoCompletedContainerStyles,
  roundInfoContainerStyles,
  roundInfoScoreStyles,
  roundInfoTimeLeftStyles,
  roundInfoTitleStyles,
  roundInfoWinnerStyles,
} from './RoundInfo.styles'

interface RoundInfoProps {
  status: 'pending' | 'active' | 'completed'
  timeLeft: string
  displayScore: number
  localTaps?: number
  roundData: RoundDetailsResponse
}

const getStatusText = (status: 'pending' | 'active' | 'completed'): string => {
  if (status === 'active') {
    return 'Раунд активен!'
  }
  if (status === 'pending') {
    return 'Раунд еще не начат'
  }
  return 'Раунд завершен'
}

export const RoundInfo = ({
  status,
  timeLeft,
  displayScore,
  localTaps,
  roundData,
}: RoundInfoProps) => {
  return (
    <VStack {...roundInfoContainerStyles}>
      <Text {...roundInfoTitleStyles}>{getStatusText(status)}</Text>
      {(status === 'active' || status === 'pending') && (
        <Text {...roundInfoTimeLeftStyles}>До конца осталось: {timeLeft}</Text>
      )}
      {status === 'completed' && (
        <VStack {...roundInfoCompletedContainerStyles}>
          <Text {...roundInfoScoreStyles}>Всего {roundData.round.totalScore}</Text>
          {roundData.topStats && roundData.topStats.length > 0 && (
            <Text {...roundInfoWinnerStyles}>
              Победитель - {roundData.topStats[0].user.username} {roundData.topStats[0].score}
            </Text>
          )}
          <Text {...roundInfoScoreStyles}>Мои очки {roundData.myStats.score}</Text>
          <Text {...roundInfoScoreStyles}>Кликов {roundData.myStats.taps}</Text>
        </VStack>
      )}
      {status !== 'completed' && (
        <>
          <Text {...roundInfoScoreStyles}>Мои очки - {displayScore}</Text>
          {localTaps !== undefined && <Text {...roundInfoScoreStyles}>Кликов - {localTaps}</Text>}
        </>
      )}
    </VStack>
  )
}
