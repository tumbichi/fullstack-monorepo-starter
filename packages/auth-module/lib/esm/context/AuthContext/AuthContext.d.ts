/// <reference types="react" />
export interface IAuthContext<GenericUser = any> {
    authenticate: boolean;
    loading: boolean;
    validateToken: (token: string) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    token: string;
    user: GenericUser | null;
}
declare const _default: import("react").Context<IAuthContext<any> | undefined>;
export default _default;
