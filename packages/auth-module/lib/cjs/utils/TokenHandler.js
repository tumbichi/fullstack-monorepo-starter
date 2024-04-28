"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cookie_cutter_1 = __importDefault(require("cookie-cutter"));
var domain = process.env.NEXT_PUBLIC_DOMAIN;
var TOKEN_COOKIE_KEY = 'token';
var TokenHandler = /** @class */ (function () {
    function TokenHandler() {
    }
    TokenHandler.registerToken = function (token) {
        cookie_cutter_1.default.set(TOKEN_COOKIE_KEY, token, { domain: domain, path: '/' });
    };
    TokenHandler.unregisterToken = function () {
        cookie_cutter_1.default.set(TOKEN_COOKIE_KEY, '', {
            domain: domain,
            path: '/',
            expires: new Date(0),
        });
    };
    TokenHandler.getTokenFromCookies = function () {
        return cookie_cutter_1.default.get(TOKEN_COOKIE_KEY);
    };
    return TokenHandler;
}());
exports.default = TokenHandler;
