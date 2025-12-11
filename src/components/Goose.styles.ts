import type { SystemStyleObject } from '@chakra-ui/react'

export const gooseContainerStyles = (isActive: boolean, canTap: boolean): SystemStyleObject => ({
  cursor: isActive && canTap ? 'pointer' : 'not-allowed',
  opacity: isActive && canTap ? 1 : 0.5,
  transition: 'all 0.2s',
  userSelect: 'none',
  _hover:
    isActive && canTap
      ? {
          transform: 'scale(1.05)',
        }
      : {},
})

export const gooseTextStyles: SystemStyleObject = {
  fontSize: '120px',
  lineHeight: '1',
}
