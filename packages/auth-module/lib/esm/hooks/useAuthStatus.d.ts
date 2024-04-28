import { IAuthContext } from '../context/AuthContext/AuthContext';
export interface AuthStatus<User> {
    user: User | null;
    token: string;
    authenticate: boolean;
    loading: boolean;
    logout: () => void;
}
export declare const useAuthStatus: <GenericUser>() => Pick<IAuthContext<GenericUser>, 'authenticate' | 'loading' | 'logout' | 'token' | 'user'>;
