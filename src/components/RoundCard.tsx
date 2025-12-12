import { Box, Card, CardBody, CardFooter, Divider, Flex, Text, VStack } from '@chakra-ui/react'
import dayjs from 'dayjs'
import { Link as RouterLink } from 'react-router-dom'

import type { Round } from '@/api/types'
import { DATE_TIME_FORMAT } from '@/config/constants'
import { getRoundStatusColor, getRoundStatusText } from '@/utils/roundFormat'

import {
  roundCardBodyAlign,
  roundCardBodySpacing,
  roundCardDividerStyles,
  roundCardFooterTextStyles,
  roundCardLabelStyles,
  roundCardLinkStyles,
  roundCardRowStyles,
  roundCardStyles,
  roundCardTextStyles,
} from './RoundCard.styles'

interface RoundCardProps {
  round: Round
}

export const RoundCard = ({ round }: RoundCardProps) => {
  return (
    <Card key={round.id} sx={roundCardStyles}>
      <CardBody>
        <VStack spacing={roundCardBodySpacing} align={roundCardBodyAlign}>
          <Flex sx={roundCardRowStyles}>
            <Text sx={roundCardLabelStyles}>Round ID:</Text>
            <Box as={RouterLink} to={`/rounds/${round.id}`} sx={roundCardLinkStyles}>
              {round.id}
            </Box>
          </Flex>
          <Flex sx={roundCardRowStyles}>
            <Text sx={roundCardLabelStyles}>Start:</Text>
            <Text sx={roundCardTextStyles}>{dayjs(round.startTime).format(DATE_TIME_FORMAT)}</Text>
          </Flex>
          <Flex sx={roundCardRowStyles}>
            <Text sx={roundCardLabelStyles}>End:</Text>
            <Text sx={roundCardTextStyles}>{dayjs(round.endTime).format(DATE_TIME_FORMAT)}</Text>
          </Flex>
        </VStack>
      </CardBody>
      <Divider sx={roundCardDividerStyles} />
      <CardFooter>
        <Text sx={roundCardFooterTextStyles(getRoundStatusColor(round))}>
          Статус: {getRoundStatusText(round)}
        </Text>
      </CardFooter>
    </Card>
  )
}
