import { useContext } from 'react'
import AuthContext, { IAuthContext } from '../context/AuthContext/AuthContext'

export interface AuthStatus<User> {
  user: User | null
  token: string
  authenticate: boolean
  loading: boolean
  logout: () => void
}

export const useAuthStatus = <GenericUser>(): Pick<
  IAuthContext<GenericUser>,
  'authenticate' | 'loading' | 'logout' | 'token' | 'user'
> => {
  const context = useContext<IAuthContext | undefined>(AuthContext)

  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider')
  }

  const { authenticate, loading, logout, token, user } = context

  return {
    authenticate,
    loading,
    logout,
    token,
    user,
  }
}
