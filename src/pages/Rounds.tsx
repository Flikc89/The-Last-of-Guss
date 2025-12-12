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
  roundsListContainerAlign,
  roundsListContainerSpacing,
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
    <Box sx={roundsPageContainerStyles}>
      <Header title="Список РАУНДОВ" user={user} />

      <Box sx={roundsListStyles}>
        {user?.role === ADMIN_ROLE && (
          <Box sx={createRoundButtonContainerStyles}>
            <Button
              colorScheme={createRoundButtonStyles.colorScheme}
              onClick={handleCreateRound}
              isLoading={createRoundMutation.isPending}
            >
              Создать раунд
            </Button>
          </Box>
        )}
        <VStack spacing={roundsListContainerSpacing} align={roundsListContainerAlign}>
          {data?.data?.length ? (
            data.data.map((round) => <RoundCard key={round.id} round={round} />)
          ) : (
            <Card sx={emptyRoundsCardStyles}>
              <CardBody>
                <Text sx={emptyRoundsTextStyles}>Нет доступных раундов</Text>
              </CardBody>
            </Card>
          )}
        </VStack>
      </Box>
    </Box>
  )
}

export default Rounds
