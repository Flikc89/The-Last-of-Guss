import { Text } from '@chakra-ui/react'

import { roundInfoTimeLeftStyles } from './RoundInfo.styles'

interface TimerProps {
  timeLeft: string
}

export const Timer = ({ timeLeft }: TimerProps) => {
  return <Text sx={roundInfoTimeLeftStyles}>До конца осталось: {timeLeft}</Text>
}
