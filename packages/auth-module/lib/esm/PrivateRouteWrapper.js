import React, { useEffect } from 'react';
import { useAuthMethods, useAuthStatus } from './hooks';
import TokenHandler from './utils/TokenHandler';
var PrivateRouteWrapper = function (_a) {
    var children = _a.children, Loading = _a.loadingElement, redirectLogin = _a.redirectLogin;
    var _b = useAuthStatus(), loading = _b.loading, authenticate = _b.authenticate;
    var validateToken = useAuthMethods().validateToken;
    useEffect(function () {
        if (authenticate || loading)
            return;
        var storageToken = TokenHandler.getTokenFromCookies();
        if (!storageToken) {
            return redirectLogin();
        }
        validateToken(storageToken).catch(redirectLogin);
    }, [redirectLogin, validateToken, loading, authenticate]);
    if (loading || !authenticate) {
        return React.createElement(Loading, null);
    }
    return React.createElement(React.Fragment, null, children);
};
export default PrivateRouteWrapper;
