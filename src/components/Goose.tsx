import { useState } from 'react'

import { Box, Text } from '@chakra-ui/react'

import { gooseContainerStyles, gooseTextStyles } from './Goose.styles'

interface GooseProps {
  onClick: () => void
  isActive: boolean
  canTap: boolean
}

export const Goose = ({ onClick, isActive, canTap }: GooseProps) => {
  const [isPressed, setIsPressed] = useState(false)

  const handleClick = () => {
    if (isActive && canTap) {
      setIsPressed(true)
      onClick()
      setTimeout(() => setIsPressed(false), 50)
    }
  }

  return (
    <Box
      onClick={handleClick}
      onMouseDown={() => isActive && canTap && setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      sx={gooseContainerStyles(isActive, canTap, isPressed)}
    >
      <Text sx={gooseTextStyles}>🪿</Text>
    </Box>
  )
}
