import type { SystemStyleObject } from '@chakra-ui/react'

export const headerStyles: SystemStyleObject = {
  minH: '60px',
  alignItems: 'center',
}

export const headerContainerStyles: SystemStyleObject = {
  as: 'header',
  p: 4,
  borderBottom: '1px',
  borderColor: 'gray.700',
}

export const headerSpacerStyles: SystemStyleObject = {
  flex: 1,
}

export const headerTitleStyles: SystemStyleObject = {
  size: 'lg',
  flex: 1,
  textAlign: 'center',
  color: 'white',
}

export const headerUserContainerStyles: SystemStyleObject = {
  flex: 1,
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
}

export const headerUserTextStyles: SystemStyleObject = {
  color: 'white',
}

export const headerLogoutButtonStyles: SystemStyleObject = {
  colorScheme: 'brand',
  size: 'sm',
}

export const headerBackButtonStyles: SystemStyleObject = {
  colorScheme: 'brand',
  size: 'sm',
}

export const headerUserTextMarginStyles: SystemStyleObject = {
  mr: 4,
}
