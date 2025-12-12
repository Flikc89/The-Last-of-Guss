import type { SystemStyleObject } from '@chakra-ui/react'

export const containerStyles: SystemStyleObject = {
  minH: '100vh',
  bg: 'gray.900',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  px: 4,
  pt: 8,
}

export const cardStyles: SystemStyleObject = {
  width: '100%',
  maxWidth: '600px',
  p: 8,
  bg: 'gray.800',
  borderColor: 'gray.700',
  borderWidth: '1px',
  borderRadius: 'lg',
  boxShadow: 'md',
}

export const headingStyles: SystemStyleObject = {
  textAlign: 'center',
  color: 'white',
}

export const headingSize = 'xl'

export const inputFocusBorderColor = 'brand.500'

export const inputStyles: SystemStyleObject = {
  _hover: {
    borderColor: 'brand.400',
    boxShadow: '0 0 0 1px var(--chakra-colors-brand-400)',
  },
  _focus: {
    boxShadow: '0 0 0 1px var(--chakra-colors-brand-500)',
  },
}

export const buttonStyles = {
  colorScheme: 'brand',
  size: 'lg',
  width: '100%',
}

export const textLabelStyles: SystemStyleObject = {
  mb: 2,
}

export const loginFormVStackSpacing = 6
export const loginFormVStackAlign = 'stretch'

export const loginFieldsVStackSpacing = 4
export const loginFieldsVStackAlign = 'stretch'

export const titleHeadingStyles: SystemStyleObject = {
  fontSize: '4xl',
  fontWeight: 'bold',
  textAlign: 'center',
  color: 'white',
  mb: 8,
}
