import { IAuthContext } from '../context/AuthContext/AuthContext';
export declare const useAuthMethods: <GenericUser>() => Pick<IAuthContext<GenericUser>, 'login' | 'validateToken'>;
