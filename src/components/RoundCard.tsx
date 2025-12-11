import { Box, Card, CardBody, CardFooter, Divider, Flex, Text, VStack } from '@chakra-ui/react'
import dayjs from 'dayjs'
import { Link as RouterLink } from 'react-router-dom'

import type { Round } from '@/api/types'
import { getRoundStatusColor, getRoundStatusText } from '@/utils/roundFormat'

import {
  roundCardBodyStyles,
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
    <Card key={round.id} {...roundCardStyles}>
      <CardBody>
        <VStack {...roundCardBodyStyles}>
          <Flex {...roundCardRowStyles}>
            <Text {...roundCardLabelStyles}>Round ID:</Text>
            <Box as={RouterLink} to={`/rounds/${round.id}`} {...roundCardLinkStyles}>
              {round.id}
            </Box>
          </Flex>
          <Flex {...roundCardRowStyles}>
            <Text {...roundCardLabelStyles}>Start:</Text>
            <Text {...roundCardTextStyles}>
              {dayjs(round.startTime).format('DD.MM.YYYY HH:mm:ss')}
            </Text>
          </Flex>
          <Flex {...roundCardRowStyles}>
            <Text {...roundCardLabelStyles}>End:</Text>
            <Text {...roundCardTextStyles}>
              {dayjs(round.endTime).format('DD.MM.YYYY HH:mm:ss')}
            </Text>
          </Flex>
        </VStack>
      </CardBody>
      <Divider {...roundCardDividerStyles} />
      <CardFooter>
        <Text {...roundCardFooterTextStyles(getRoundStatusColor(round))}>
          Статус: {getRoundStatusText(round)}
        </Text>
      </CardFooter>
    </Card>
  )
}
