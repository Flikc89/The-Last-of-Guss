import type { SystemStyleObject } from '@chakra-ui/react'

export const roundCardStyles: SystemStyleObject = {
  bg: 'gray.800',
  borderColor: 'gray.700',
  borderWidth: '1px',
}

export const roundCardBodyAlign = 'stretch'
export const roundCardBodySpacing = 3

export const roundCardRowStyles: SystemStyleObject = {
  align: 'center',
}

export const roundCardLabelStyles: SystemStyleObject = {
  fontWeight: 'bold',
  color: 'brand.400',
  mr: 2,
}

export const roundCardLinkStyles: SystemStyleObject = {
  color: 'brand.300',
  cursor: 'pointer',
  _hover: {
    color: 'brand.200',
    textDecoration: 'underline',
  },
}

export const roundCardTextStyles: SystemStyleObject = {
  color: 'white',
}

export const roundCardDividerStyles: SystemStyleObject = {
  borderColor: 'gray.700',
}

export const roundCardFooterTextStyles = (color: string): SystemStyleObject => ({
  fontWeight: 'bold',
  color: `${color}.400`,
})
