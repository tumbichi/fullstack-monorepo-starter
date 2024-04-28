export interface AuthServiceResponse<T> {
    user: T;
    accessToken: string;
}
