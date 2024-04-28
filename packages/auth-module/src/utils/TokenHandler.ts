import cookie from 'cookie-cutter'

const domain = process.env.NEXT_PUBLIC_DOMAIN

const TOKEN_COOKIE_KEY = 'token'

export default class TokenHandler {
  public static registerToken(token: string): void {
    cookie.set(TOKEN_COOKIE_KEY, token, { domain, path: '/' })
  }

  public static unregisterToken(): void {
    cookie.set(TOKEN_COOKIE_KEY, '', {
      domain,
      path: '/',
      expires: new Date(0),
    })
  }

  public static getTokenFromCookies(): string | undefined {
    return cookie.get(TOKEN_COOKIE_KEY)
  }
}
