import { Box, Button, Card, CardBody, Text, VStack } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

import { useRounds, useCreateRound } from '@/api/rounds'
import { ErrorState } from '@/components/ErrorState'
import { Header } from '@/components/Header'
import { LoadingState } from '@/components/LoadingState'
import { RoundCard } from '@/components/RoundCard'
import { ADMIN_ROLE } from '@/config/constants'
import { usePageVisibility } from '@/hooks/usePageVisibility'
import { useUserSync } from '@/hooks/useUserSync'

import {
  createRoundButtonContainerStyles,
  createRoundButtonStyles,
  emptyRoundsCardStyles,
  emptyRoundsTextStyles,
  roundsListContainerStyles,
  roundsListStyles,
  roundsPageContainerStyles,
} from './Rounds.styles'

function Rounds() {
  const navigate = useNavigate()
  const user = useUserSync()
  const isPageVisible = usePageVisibility()
  const { data, isLoading, error } = useRounds(undefined, isPageVisible)
  const createRoundMutation = useCreateRound()

  const handleCreateRound = async () => {
    try {
      const newRound = await createRoundMutation.mutateAsync()
      navigate(`/rounds/${newRound.id}`)
    } catch (err) {
      console.error('Failed to create round:', err)
    }
  }

  if (isLoading) {
    return <LoadingState message="Загрузка..." />
  }

  if (error) {
    return <ErrorState message="Ошибка загрузки раундов" />
  }

  return (
    <Box {...roundsPageContainerStyles}>
      <Header title="Список РАУНДОВ" user={user} />

      <Box {...roundsListStyles}>
        {user?.role === ADMIN_ROLE && (
          <Box {...createRoundButtonContainerStyles}>
            <Button
              {...createRoundButtonStyles}
              onClick={handleCreateRound}
              isLoading={createRoundMutation.isPending}
            >
              Создать раунд
            </Button>
          </Box>
        )}
        <VStack {...roundsListContainerStyles}>
          {data?.data?.length ? (
            data.data.map((round) => <RoundCard key={round.id} round={round} />)
          ) : (
            <Card {...emptyRoundsCardStyles}>
              <CardBody>
                <Text {...emptyRoundsTextStyles}>Нет доступных раундов</Text>
              </CardBody>
            </Card>
          )}
        </VStack>
      </Box>
    </Box>
  )
}

export default Rounds
