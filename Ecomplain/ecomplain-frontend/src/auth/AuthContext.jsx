import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import api from '../lib/api.js'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token') || '')
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('user')
    return raw ? JSON.parse(raw) : null
  })

  useEffect(() => {
    if (token) localStorage.setItem('token', token)
    else localStorage.removeItem('token')
  }, [token])

  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user))
    else localStorage.removeItem('user')
  }, [user])

  const value = useMemo(() => ({
    token,
    setToken,
    user,
    setUser,
    isStaff: user?.role ? true : false,
    logout: () => { 
      console.log('AuthContext logout called, clearing token and user')
      setToken(''); 
      setUser(null) 
    },
  }), [token, user])

  // attach token to axios
  useEffect(() => {
    api.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : ''
  }, [token])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}


