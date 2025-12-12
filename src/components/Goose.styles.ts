import type { SystemStyleObject } from '@chakra-ui/react'

export const gooseContainerStyles = (
  isActive: boolean,
  canTap: boolean,
  isPressed: boolean,
): SystemStyleObject => ({
  cursor: isActive && canTap ? 'pointer' : 'not-allowed',
  opacity: isActive && canTap ? 1 : 0.5,
  transition: 'transform 0.05s ease-out',
  userSelect: 'none',
  transform: isPressed ? 'scale(0.9)' : 'scale(1)',
  _hover:
    isActive && canTap && !isPressed
      ? {
          transform: 'scale(1.05)',
        }
      : {},
})

export const gooseTextStyles: SystemStyleObject = {
  fontSize: '120px',
  lineHeight: '1',
}
