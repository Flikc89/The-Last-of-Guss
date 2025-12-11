import { useQuery } from '@tanstack/react-query'

import { apiClient } from './client'
import type { LoginRequest, LoginResponse, User } from './types'

export const authApi = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>('/auth/login', data)
    if (response.data.token) {
      localStorage.setItem('token', response.data.token)
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
      localStorage.removeItem('token')
    }
  },
  getToken: (): string | null => {
    return localStorage.getItem('token')
  },
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('token')
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
