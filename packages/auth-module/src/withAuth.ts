import { GetServerSidePropsContext } from 'next'
import Cookies from 'cookies'
import { validateToken } from './services'

type GetServerSidePropsWithAuth<GenericUser> = (
  context: GetServerSidePropsContext,
  user: GenericUser
) => unknown

const redirectLogin = (appUrl?: string) => {
  const appUrlQuery = appUrl ? `?app=${appUrl}` : ''

  return {
    redirect: {
      permanent: false,
      destination: `${process.env.NEXT_PUBLIC_AUTH_PORTAL_URL}${appUrlQuery}`,
    },
  }
}

const withAuth =
  <GenericUser>(getServerSideProps: GetServerSidePropsWithAuth<GenericUser>) =>
  async (context: GetServerSidePropsContext) => {
    const cookies = new Cookies(context.req, context.res)
    const appUrl = `http://${context.req.headers.host}`

    const token = cookies.get('token')

    if (!token) {
      console.log('token doesnt exist')
      return redirectLogin(appUrl)
    }

    try {
      const { user } = await validateToken<GenericUser>(token)

      return getServerSideProps(context, user)
    } catch (e) {
      console.error('withAuth error: validating token ', e)
      return redirectLogin(appUrl)
    }
  }

export default withAuth
