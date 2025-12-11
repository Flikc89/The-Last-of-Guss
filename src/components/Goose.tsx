import { Box, Text } from '@chakra-ui/react'

import { gooseContainerStyles, gooseTextStyles } from './Goose.styles'

interface GooseProps {
  onClick: () => void
  isActive: boolean
  canTap: boolean
}

export const Goose = ({ onClick, isActive, canTap }: GooseProps) => {
  return (
    <Box onClick={onClick} {...gooseContainerStyles(isActive, canTap)}>
      <Text {...gooseTextStyles}>🪿</Text>
    </Box>
  )
}
