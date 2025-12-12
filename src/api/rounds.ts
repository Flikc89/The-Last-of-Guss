import { useMutation, useQuery } from '@tanstack/react-query'

import { useStore } from '@/store'

import { authApi } from './auth'
import { apiClient } from './client'
import type {
  Round,
  RoundDetailsResponse,
  RoundsQueryParams,
  RoundsResponse,
  TapResponse,
} from './types'

export const roundsApi = {
  getRounds: async (params?: RoundsQueryParams): Promise<RoundsResponse> => {
    const response = await apiClient.get<RoundsResponse>('/rounds', { params })
    return response.data
  },
  getRound: async (roundId: string): Promise<RoundDetailsResponse> => {
    const response = await apiClient.get<RoundDetailsResponse>(`/rounds/${roundId}`)
    return response.data
  },
  createRound: async (): Promise<Round> => {
    const response = await apiClient.post<Round>('/rounds')
    return response.data
  },
  tap: async (roundId: string): Promise<TapResponse> => {
    const response = await apiClient.post<TapResponse>(`/rounds/${roundId}/tap`)
    return response.data
  },
}

export const useRounds = (params?: RoundsQueryParams, enabled: boolean = true) => {
  const getRoundsList = useStore((state) => state.getRoundsList)
  const setRoundsList = useStore((state) => state.setRoundsList)
  const storedRounds = getRoundsList()

  return useQuery({
    queryKey: ['rounds', params],
    queryFn: async () => {
      const data = await roundsApi.getRounds(params)
      setRoundsList(data)
      return data
    },
    ...(storedRounds && { placeholderData: storedRounds }),
    refetchInterval: enabled ? 5000 : false,
    refetchOnMount: true,
    staleTime: 0,
    gcTime: 0,
    structuralSharing: false,
    enabled: enabled && authApi.isAuthenticated(),
  })
}

export const useRound = (roundId: string, status?: 'pending' | 'active' | 'completed') => {
  const getRefetchInterval = () => {
    if (!status) return 1000
    if (status === 'completed') return false
    if (status === 'pending') return 5000
    if (status === 'active') return false
    return 1000
  }

  return useQuery({
    queryKey: ['round', roundId],
    queryFn: () => roundsApi.getRound(roundId),
    refetchInterval: getRefetchInterval(),
    refetchOnMount: status === 'completed' ? 'always' : true,
    enabled: !!roundId && authApi.isAuthenticated(),
  })
}

export const useCreateRound = () => {
  return useMutation({
    mutationFn: roundsApi.createRound,
  })
}
