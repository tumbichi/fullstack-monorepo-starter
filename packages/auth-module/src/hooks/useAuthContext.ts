import { useContext } from 'react'
import AuthContext, { IAuthContext } from '../context/AuthContext/AuthContext'

export const useAuthContext = <GenericUser>(): IAuthContext => {
  const context = useContext<IAuthContext<GenericUser> | undefined>(AuthContext)

  if (context === undefined) {
    throw new Error('useAuthContext must be used within a AuthProvider')
  }

  return context
}
