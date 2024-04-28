"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var hooks_1 = require("./hooks");
var TokenHandler_1 = __importDefault(require("./utils/TokenHandler"));
var PrivateRouteWrapper = function (_a) {
    var children = _a.children, Loading = _a.loadingElement, redirectLogin = _a.redirectLogin;
    var _b = (0, hooks_1.useAuthStatus)(), loading = _b.loading, authenticate = _b.authenticate;
    var validateToken = (0, hooks_1.useAuthMethods)().validateToken;
    (0, react_1.useEffect)(function () {
        if (authenticate || loading)
            return;
        var storageToken = TokenHandler_1.default.getTokenFromCookies();
        if (!storageToken) {
            return redirectLogin();
        }
        validateToken(storageToken).catch(redirectLogin);
    }, [redirectLogin, validateToken, loading, authenticate]);
    if (loading || !authenticate) {
        return react_1.default.createElement(Loading, null);
    }
    return react_1.default.createElement(react_1.default.Fragment, null, children);
};
exports.default = PrivateRouteWrapper;
