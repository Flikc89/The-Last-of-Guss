import { Box, Text } from '@chakra-ui/react'

import { errorContainerStyles, errorTextStyles } from './ErrorState.styles'

interface ErrorStateProps {
  message?: string
}

export const ErrorState = ({ message = 'Произошла ошибка' }: ErrorStateProps) => {
  return (
    <Box sx={errorContainerStyles}>
      <Text sx={errorTextStyles}>{message}</Text>
    </Box>
  )
}
