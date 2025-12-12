import type { SystemStyleObject } from '@chakra-ui/react'

export const roundPageContainerStyles: SystemStyleObject = {
  minH: '100vh',
  bg: 'gray.900',
  display: 'flex',
  flexDirection: 'column',
}

export const roundContentStyles: SystemStyleObject = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flex: 1,
  p: 8,
}

export const roundContentVStackSpacing = 6
export const roundContentVStackAlign = 'center'
