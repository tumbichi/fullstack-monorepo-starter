import React, { ReactNode } from 'react';
interface AuthProviderProps {
    children: ReactNode;
}
declare function AuthProvider<GenericUser>({ children }: AuthProviderProps): React.JSX.Element;
export default AuthProvider;
