import { useContext } from 'react'
import AuthContext, { IAuthContext } from '../context/AuthContext/AuthContext'

export const useAuthMethods = <GenericUser>(): Pick<
  IAuthContext<GenericUser>,
  'login' | 'validateToken'
> => {
  const context = useContext<IAuthContext | undefined>(AuthContext)

  if (context === undefined) {
    throw new Error('useAuthMethods must be used within a AuthProvider')
  }

  const { login, validateToken } = context

  return {
    login,
    validateToken,
  }
}
