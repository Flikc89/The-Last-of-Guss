import { useEffect } from 'react'

import { useMe } from '@/api/auth'
import { useStore } from '@/store'

export const useUserSync = () => {
  const setUser = useStore((state) => state.setUser)
  const { data: userData } = useMe()
  const storeUser = useStore((state) => state.user)

  useEffect(() => {
    if (userData && userData !== storeUser) {
      setUser(userData)
    }
  }, [userData, storeUser, setUser])

  return userData || storeUser
}
