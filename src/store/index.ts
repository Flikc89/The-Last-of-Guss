import { create } from 'zustand'

import type { User } from '@/api/types'

interface StoreState {
  user: User | null
}

interface StoreActions {
  setUser: (user: User | null) => void
  logout: () => void
}

type Store = StoreState & StoreActions

export const useStore = create<Store>()((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}))
