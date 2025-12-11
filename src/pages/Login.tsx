import { useState } from 'react'

import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'

import { authApi } from '@/api/auth'
import { useStore } from '@/store'

import {
  buttonStyles,
  cardStyles,
  containerStyles,
  headingStyles,
  inputStyles,
  loginFieldsVStackStyles,
  loginFormVStackStyles,
  textLabelStyles,
  titleHeadingStyles,
} from './Login.styles'

function Login() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const setUser = useStore((state) => state.setUser)
  const logout = useStore((state) => state.logout)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      logout()
      queryClient.clear()
      setUser({ username: data.username, role: data.role })
      navigate('/rounds')
    },
    onError: (err: AxiosError<{ message: string }>) => {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        'Ошибка входа. Проверьте имя пользователя и пароль.'
      setError(message)
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!username.trim() || !password.trim()) {
      setError('Заполните все поля')
      return
    }

    loginMutation.mutate({ username: username.trim(), password })
  }

  return (
    <Box {...containerStyles}>
      <Heading {...titleHeadingStyles}>The Last of Guss</Heading>
      <Box {...cardStyles}>
        <VStack {...loginFormVStackStyles}>
          <Heading {...headingStyles}>ВОЙТИ</Heading>

          <form onSubmit={handleSubmit}>
            <VStack {...loginFieldsVStackStyles}>
              <FormControl isInvalid={!!error && !username.trim()}>
                <Text {...textLabelStyles}>Имя пользователя</Text>
                <Input
                  type="text"
                  value={username}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                  placeholder="Введите имя пользователя"
                  disabled={loginMutation.isPending}
                  {...inputStyles}
                />
              </FormControl>

              <FormControl isInvalid={!!error && !password.trim()}>
                <Text {...textLabelStyles}>Пароль</Text>
                <Input
                  type="password"
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                  placeholder="Введите пароль"
                  disabled={loginMutation.isPending}
                  {...inputStyles}
                />
              </FormControl>

              {error && (
                <FormControl isInvalid={!!error}>
                  <FormErrorMessage>{error}</FormErrorMessage>
                </FormControl>
              )}

              <Button
                type="submit"
                {...buttonStyles}
                isLoading={loginMutation.isPending}
                loadingText="Вход..."
              >
                Войти
              </Button>
            </VStack>
          </form>
        </VStack>
      </Box>
    </Box>
  )
}

export default Login
