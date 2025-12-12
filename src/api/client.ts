import axios, { AxiosError } from 'axios'

import { authApi } from './auth'

const getBaseURL = () => {
  if (import.meta.env.MODE === 'development') {
    return '/api/v1'
  }
  return import.meta.env.VITE_API_URL
}

const baseURL = getBaseURL()

if (!baseURL) {
  console.error('VITE_API_URL is not defined in .env file')
}

export const apiClient = axios.create({
  baseURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  withCredentials: !import.meta.env.DEV,
})

apiClient.interceptors.request.use((config) => {
  const token = authApi.getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message: string }>) => {
    if (error.response?.status === 401) {
      authApi.removeToken()
      if (window.location.pathname !== '/login') {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  },
)
