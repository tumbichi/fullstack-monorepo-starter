import { axiosInstance, handleAxiosError } from '.'
import { AuthServiceResponse } from '../types'
import TokenHandler from '../utils/TokenHandler'

export interface LoginPromiseResponse<GenericUser> {
  user: GenericUser
  token: string
}

const apiURL = process.env.NEXT_PUBLIC_AUTH_API_URL

export const validateToken = async <GenericUser>(
  jwt: string
): Promise<LoginPromiseResponse<GenericUser>> => {
  try {
    // Adding token on the header of the axios intance
    axiosInstance.defaults.headers.common = {
      Authorization: `Bearer ${jwt}`,
    }

    const res = await axiosInstance.post<GenericUser>(
      `${apiURL}/auth/validate-authorization`,
      undefined,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    )

    return { user: res.data, token: jwt }
  } catch (error) {
    axiosInstance.defaults.headers.common = { Authorization: '' }
    throw handleAxiosError(error)
  }
}

export const login = async <GenericUser>(
  email: string,
  password: string
): Promise<LoginPromiseResponse<GenericUser>> => {
  try {
    const res = await axiosInstance.post<AuthServiceResponse<GenericUser>>(
      `${apiURL}/auth/login`,
      {
        email,
        password,
      }
    )

    console.log('Login salio bien :>> ', res)
    // Adding token on the header of the axios intance
    axiosInstance.defaults.headers.common = {
      Authorization: `Bearer ${res.data.accessToken}`,
    }

    // Store token on cookie
    TokenHandler.registerToken(res.data.accessToken)

    return { user: res.data.user, token: res.data.accessToken }
  } catch (error) {
    console.error('service/login error :>> ', error)
    throw handleAxiosError(error)
  }
}
