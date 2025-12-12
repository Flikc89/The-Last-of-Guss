import { Text, VStack } from '@chakra-ui/react'

import type { RoundDetailsResponse } from '@/api/types'
import { getInfoStatusText } from '@/utils/roundFormat'
import type { RoundStatus } from '@/utils/roundUtils'

import {
  roundInfoCompletedContainerAlign,
  roundInfoCompletedContainerSpacing,
  roundInfoContainerAlign,
  roundInfoContainerSpacing,
  roundInfoScoreStyles,
  roundInfoTitleStyles,
  roundInfoWinnerStyles,
} from './RoundInfo.styles'
import { ScoreDisplay } from './ScoreDisplay'

interface RoundInfoProps {
  status: RoundStatus
  displayScore: number
  localTaps?: number
  roundData: RoundDetailsResponse
}

export const RoundInfo = ({ status, displayScore, localTaps, roundData }: RoundInfoProps) => {
  return (
    <VStack spacing={roundInfoContainerSpacing} align={roundInfoContainerAlign}>
      <Text sx={roundInfoTitleStyles}>{getInfoStatusText(status)}</Text>
      {status === 'completed' && (
        <VStack
          spacing={roundInfoCompletedContainerSpacing}
          align={roundInfoCompletedContainerAlign}
        >
          <Text sx={roundInfoScoreStyles}>Всего {roundData.round.totalScore}</Text>
          {roundData.topStats && roundData.topStats.length > 0 && (
            <Text sx={roundInfoWinnerStyles}>
              Победитель - {roundData.topStats[0].user.username} {roundData.topStats[0].score}
            </Text>
          )}
          <ScoreDisplay score={roundData.myStats.score} taps={roundData.myStats.taps} />
        </VStack>
      )}
      {status !== 'completed' && <ScoreDisplay score={displayScore} taps={localTaps} />}
    </VStack>
  )
}
