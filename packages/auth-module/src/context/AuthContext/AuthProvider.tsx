import React, { ReactNode, useCallback, useState } from 'react'
import AuthContext from './AuthContext'
import {
  login as requestLogin,
  validateToken as requestValidateToken,
} from '../../services'
import TokenHandler from '../../utils/TokenHandler'

interface AuthProviderProps {
  children: ReactNode
}

function AuthProvider<GenericUser>({ children }: AuthProviderProps) {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<GenericUser | null>(null)
  const [token, setToken] = useState<string>('')
  const authenticate = user !== null && token !== ''

  const logout = useCallback(() => {
    TokenHandler.unregisterToken()
    setUser(null)
    setToken('')
    // window.location.href = `${process.env.NEXT_PUBLIC_AUTH_PORTAL_URL}?app="${window.location.href}"`
  }, [])

  const saveLoginCredentials = useCallback(
    (newToken: string, newUser: GenericUser) => {
      setToken(newToken)
      setUser(newUser)
    },
    []
  )

  const login = useCallback(
    async (email: string, password: string): Promise<void> => {
      setLoading(true)

      try {
        const response = await requestLogin<GenericUser>(email, password)
        saveLoginCredentials(response.token, response.user)
      } catch (e) {
        logout()
        throw e
      } finally {
        setLoading(false)
      }
    },
    []
  )

  const validateToken = useCallback(async (token: string): Promise<void> => {
    setLoading(true)

    try {
      const response = await requestValidateToken<GenericUser>(token)
      saveLoginCredentials(response.token, response.user)
    } catch (e) {
      logout()
      throw e
    } finally {
      setLoading(false)
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user: user as GenericUser,
        token,
        authenticate,
        validateToken,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
