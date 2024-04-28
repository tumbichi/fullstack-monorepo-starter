import cookie from 'cookie-cutter';
var domain = process.env.NEXT_PUBLIC_DOMAIN;
var TOKEN_COOKIE_KEY = 'token';
var TokenHandler = /** @class */ (function () {
    function TokenHandler() {
    }
    TokenHandler.registerToken = function (token) {
        cookie.set(TOKEN_COOKIE_KEY, token, { domain: domain, path: '/' });
    };
    TokenHandler.unregisterToken = function () {
        cookie.set(TOKEN_COOKIE_KEY, '', {
            domain: domain,
            path: '/',
            expires: new Date(0),
        });
    };
    TokenHandler.getTokenFromCookies = function () {
        return cookie.get(TOKEN_COOKIE_KEY);
    };
    return TokenHandler;
}());
export default TokenHandler;
