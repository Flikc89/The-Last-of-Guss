import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import { authApi } from '@/api/auth'
import type { User } from '@/api/types'
import { useStore } from '@/store'

import {
  headerBackButtonStyles,
  headerContainerStyles,
  headerLogoutButtonStyles,
  headerSpacerStyles,
  headerStyles,
  headerTitleSize,
  headerTitleStyles,
  headerUserContainerStyles,
  headerUserTextMarginStyles,
  headerUserTextStyles,
} from './Header.styles'

interface HeaderProps {
  title: string
  user?: User | null
  showBackButton?: boolean
  backUrl?: string
}

export const Header = ({
  title,
  user,
  showBackButton = false,
  backUrl = '/rounds',
}: HeaderProps) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const logoutStore = useStore((state) => state.logout)

  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      logoutStore()
      queryClient.clear()
      navigate('/login')
    },
  })

  const handleLogout = () => {
    logoutMutation.mutate()
  }

  const handleBack = () => {
    navigate(backUrl)
  }

  return (
    <Flex as="header" sx={{ ...headerStyles, ...headerContainerStyles }}>
      <Box sx={headerSpacerStyles}>
        {showBackButton && (
          <Button
            colorScheme={headerBackButtonStyles.colorScheme}
            size={headerBackButtonStyles.size}
            onClick={handleBack}
          >
            Назад
          </Button>
        )}
      </Box>
      <Heading size={headerTitleSize} sx={headerTitleStyles}>
        {title}
      </Heading>
      <Box sx={headerUserContainerStyles}>
        {user && (
          <>
            <Text sx={{ ...headerUserTextStyles, ...headerUserTextMarginStyles }}>
              {user.username}
            </Text>
            <Button
              colorScheme={headerLogoutButtonStyles.colorScheme}
              size={headerLogoutButtonStyles.size}
              onClick={handleLogout}
              isLoading={logoutMutation.isPending}
            >
              Выйти
            </Button>
          </>
        )}
      </Box>
    </Flex>
  )
}
