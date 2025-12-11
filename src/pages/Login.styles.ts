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
  as: 'h1',
  size: 'xl',
  textAlign: 'center',
  color: 'white',
}

export const inputStyles: SystemStyleObject = {
  focusBorderColor: 'brand.500',
  _hover: {
    borderColor: 'brand.400',
    boxShadow: '0 0 0 1px var(--chakra-colors-brand-400)',
  },
  _focus: {
    boxShadow: '0 0 0 1px var(--chakra-colors-brand-500)',
  },
}

export const buttonStyles: SystemStyleObject = {
  colorScheme: 'brand',
  size: 'lg',
  width: '100%',
}

export const textLabelStyles: SystemStyleObject = {
  mb: 2,
}

export const loginFormVStackStyles: SystemStyleObject = {
  spacing: 6,
  align: 'stretch',
}

export const loginFieldsVStackStyles: SystemStyleObject = {
  spacing: 4,
  align: 'stretch',
}

export const titleHeadingStyles: SystemStyleObject = {
  as: 'h1',
  fontSize: '4xl',
  fontWeight: 'bold',
  textAlign: 'center',
  color: 'white',
  mb: 8,
}
