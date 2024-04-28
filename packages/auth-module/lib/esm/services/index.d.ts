import { AxiosError } from 'axios';
export interface PromiseErrorResponse {
    message: string;
    status: number;
    statusText: string;
}
interface ServiceError {
    code: number;
    message: string;
    stackTrace: string;
    status: string;
    timestamp: string;
}
export declare const axiosInstance: import("axios").AxiosInstance;
export declare const handleAxiosError: (error: Error | AxiosError<ServiceError>) => PromiseErrorResponse;
export * from './auth.services';
