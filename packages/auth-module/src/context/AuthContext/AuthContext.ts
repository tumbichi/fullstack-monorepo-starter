import { createContext } from 'react'

export interface IAuthContext<GenericUser = any> {
  authenticate: boolean
  loading: boolean
  validateToken: (token: string) => Promise<void>
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  token: string
  user: GenericUser | null
}

export default createContext<IAuthContext | undefined>(undefined)
