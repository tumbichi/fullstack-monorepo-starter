import { useContext } from 'react';
import AuthContext from '../context/AuthContext/AuthContext';
export var useAuthStatus = function () {
    var context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within a AuthProvider');
    }
    var authenticate = context.authenticate, loading = context.loading, logout = context.logout, token = context.token, user = context.user;
    return {
        authenticate: authenticate,
        loading: loading,
        logout: logout,
        token: token,
        user: user,
    };
};
