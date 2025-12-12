import { Text } from '@chakra-ui/react'

import { roundInfoScoreStyles } from './RoundInfo.styles'

interface ScoreDisplayProps {
  score: number
  taps?: number
}

export const ScoreDisplay = ({ score, taps }: ScoreDisplayProps) => {
  return (
    <>
      <Text sx={roundInfoScoreStyles}>Мои очки - {score}</Text>
      {taps !== undefined && <Text sx={roundInfoScoreStyles}>Кликов - {taps}</Text>}
    </>
  )
}
