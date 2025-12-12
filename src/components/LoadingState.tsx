import { Box, Text } from '@chakra-ui/react'

import { loadingContainerStyles, loadingTextStyles } from './LoadingState.styles'

interface LoadingStateProps {
  message?: string
}

export const LoadingState = ({ message = 'Загрузка...' }: LoadingStateProps) => {
  return (
    <Box sx={loadingContainerStyles}>
      <Text sx={loadingTextStyles}>{message}</Text>
    </Box>
  )
}
