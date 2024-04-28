import React, { FC, PropsWithChildren, useEffect, ElementType } from 'react'
import { useAuthMethods, useAuthStatus } from './hooks'
import TokenHandler from './utils/TokenHandler'

interface PrivateRouteWrapperProps {
  redirectLogin: () => void
  loadingElement: ElementType
}

const PrivateRouteWrapper: FC<PropsWithChildren<PrivateRouteWrapperProps>> = ({
  children,
  loadingElement: Loading,
  redirectLogin,
}) => {
  const { loading, authenticate } = useAuthStatus()
  const { validateToken } = useAuthMethods()

  useEffect(() => {
    if (authenticate || loading) return

    const storageToken = TokenHandler.getTokenFromCookies()

    if (!storageToken) {
      return redirectLogin()
    }

    validateToken(storageToken).catch(redirectLogin)
  }, [redirectLogin, validateToken, loading, authenticate])

  if (loading || !authenticate) {
    return <Loading />
  }

  return <>{children}</>
}

export default PrivateRouteWrapper
