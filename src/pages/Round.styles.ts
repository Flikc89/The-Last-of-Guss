import type { SystemStyleObject } from '@chakra-ui/react'

export const roundPageContainerStyles: SystemStyleObject = {
  minH: '100vh',
  bg: 'gray.900',
}

export const roundContentStyles: SystemStyleObject = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minH: 'calc(100vh - 70px)',
  p: 8,
}

export const roundContentVStackStyles: SystemStyleObject = {
  spacing: 6,
  align: 'center',
}

export const headerStyles: SystemStyleObject = {
  minH: '60px',
  alignItems: 'center',
}
