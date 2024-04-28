import { useContext } from 'react';
import AuthContext from '../context/AuthContext/AuthContext';
export var useAuthContext = function () {
    var context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuthContext must be used within a AuthProvider');
    }
    return context;
};
