import { useContext } from 'react';
import AuthContext from '../context/AuthContext/AuthContext';
export var useAuthMethods = function () {
    var context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuthMethods must be used within a AuthProvider');
    }
    var login = context.login, validateToken = context.validateToken;
    return {
        login: login,
        validateToken: validateToken,
    };
};
