import axios, { AxiosError } from 'axios'

export interface PromiseErrorResponse {
  message: string
  status: number
  statusText: string
}

interface ServiceError {
  code: number
  message: string
  stackTrace: string
  status: string
  timestamp: string
}

export const axiosInstance = axios.create({
  headers: { 'Content-Type': 'application/json' },
})

export const handleAxiosError = (
  error: Error | AxiosError<ServiceError>
): PromiseErrorResponse => {
  if (axios.isAxiosError(error)) {
    if (error.response?.data) {
      const res: ServiceError = error.response.data as ServiceError
      return {
        message: res.message,
        status: res.code,
        statusText: res.status,
      }
    }

    return {
      message: error.message,
      status: 500,
      statusText: error.code || 'Unexpected',
    }
  } else {
    return {
      status: 500,
      statusText: error.name || 'Error',
      message: error.message || 'Unexpected error',
    }
  }
}

export * from './auth.services'
