'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { BACKEND_ROUTES } from '@/utils/routes';
import { API_URL } from '@/utils/config';

type User = {
  _id: string
  name: string
  email: string
  token: string
} | null

type UserContextType = {
  user: User
  setUser: (user: User) => void
  loading: boolean
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      if (typeof window === 'undefined') return

      const token = localStorage.getItem('token')
      if (!token) {
        setLoading(false)
        return
      }

      const url = API_URL + BACKEND_ROUTES.AUTH.GETUSER;

      try {
        const res = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        })
        setUser({ ...res.data, token })
      } catch (err) {
        console.error('Error fetching user:', err)
        setUser(null)
        localStorage.removeItem('token')
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) throw new Error('useUser must be used within a UserProvider')
  return context
}
