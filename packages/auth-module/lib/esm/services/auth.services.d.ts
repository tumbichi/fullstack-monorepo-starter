export interface LoginPromiseResponse<GenericUser> {
    user: GenericUser;
    token: string;
}
export declare const validateToken: <GenericUser>(jwt: string) => Promise<LoginPromiseResponse<GenericUser>>;
export declare const login: <GenericUser>(email: string, password: string) => Promise<LoginPromiseResponse<GenericUser>>;
