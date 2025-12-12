import { create } from 'zustand'

import type { RoundsResponse, User } from '@/api/types'

interface RoundStats {
  score: number
  taps: number
}

interface StoreState {
  user: User | null
  roundStats: Record<string, RoundStats>
  roundsList: RoundsResponse | null
}

interface StoreActions {
  setUser: (user: User | null) => void
  logout: () => void
  setRoundStats: (roundId: string, stats: RoundStats) => void
  getRoundStats: (roundId: string) => RoundStats | undefined
  clearRoundStats: (roundId: string) => void
  setRoundsList: (rounds: RoundsResponse | null) => void
  getRoundsList: () => RoundsResponse | null
}

type Store = StoreState & StoreActions

export const useStore = create<Store>()((set, get) => ({
  user: null,
  roundStats: {},
  roundsList: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null, roundStats: {}, roundsList: null }),
  setRoundStats: (roundId, stats) =>
    set((state) => ({
      roundStats: { ...state.roundStats, [roundId]: stats },
    })),
  getRoundStats: (roundId) => get().roundStats[roundId],
  clearRoundStats: (roundId) =>
    set((state) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [roundId]: _, ...rest } = state.roundStats
      return { roundStats: rest }
    }),
  setRoundsList: (rounds) => set({ roundsList: rounds }),
  getRoundsList: () => get().roundsList,
}))
