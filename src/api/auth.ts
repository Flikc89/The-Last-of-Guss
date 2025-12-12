import { useQuery } from '@tanstack/react-query'

import { apiClient } from './client'
import type { LoginRequest, LoginResponse, User } from './types'

export const authApi = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>('/auth/login', data)
    if (response.data.token) {
      authApi.setToken(response.data.token)
    }
    return response.data
  },
  me: async (): Promise<User> => {
    const response = await apiClient.get<User>('/auth/me')
    return response.data
  },
  logout: async (): Promise<void> => {
    try {
      await apiClient.post('/auth/logout')
    } finally {
      authApi.removeToken()
    }
  },
  getToken: (): string | null => {
    return localStorage.getItem('token')
  },
  removeToken: (): void => {
    localStorage.removeItem('token')
  },
  setToken: (token: string): void => {
    localStorage.setItem('token', token)
  },
  isAuthenticated: (): boolean => {
    return !!authApi.getToken()
  },
}

export const useMe = () => {
  return useQuery({
    queryKey: ['auth', 'me'],
    queryFn: authApi.me,
    enabled: authApi.isAuthenticated(),
    retry: false,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}
