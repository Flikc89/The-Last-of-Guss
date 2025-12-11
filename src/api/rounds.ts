import { useMutation, useQuery } from '@tanstack/react-query'

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
  return useQuery({
    queryKey: ['rounds', params],
    queryFn: () => roundsApi.getRounds(params),
    refetchInterval: enabled ? 5000 : false,
    refetchOnMount: true,
    staleTime: 0,
    gcTime: 0,
    structuralSharing: false,
    enabled,
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
    enabled: !!roundId,
  })
}

export const useCreateRound = () => {
  return useMutation({
    mutationFn: roundsApi.createRound,
  })
}
