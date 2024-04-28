var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import React, { useCallback, useState } from 'react';
import AuthContext from './AuthContext';
import { login as requestLogin, validateToken as requestValidateToken, } from '../../services';
import TokenHandler from '../../utils/TokenHandler';
function AuthProvider(_a) {
    var _this = this;
    var children = _a.children;
    var _b = useState(false), loading = _b[0], setLoading = _b[1];
    var _c = useState(null), user = _c[0], setUser = _c[1];
    var _d = useState(''), token = _d[0], setToken = _d[1];
    var authenticate = user !== null && token !== '';
    var logout = useCallback(function () {
        TokenHandler.unregisterToken();
        setUser(null);
        setToken('');
        // window.location.href = `${process.env.NEXT_PUBLIC_AUTH_PORTAL_URL}?app="${window.location.href}"`
    }, []);
    var saveLoginCredentials = useCallback(function (newToken, newUser) {
        setToken(newToken);
        setUser(newUser);
    }, []);
    var login = useCallback(function (email, password) { return __awaiter(_this, void 0, void 0, function () {
        var response, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, requestLogin(email, password)];
                case 2:
                    response = _a.sent();
                    saveLoginCredentials(response.token, response.user);
                    return [3 /*break*/, 5];
                case 3:
                    e_1 = _a.sent();
                    logout();
                    throw e_1;
                case 4:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); }, []);
    var validateToken = useCallback(function (token) { return __awaiter(_this, void 0, void 0, function () {
        var response, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, requestValidateToken(token)];
                case 2:
                    response = _a.sent();
                    saveLoginCredentials(response.token, response.user);
                    return [3 /*break*/, 5];
                case 3:
                    e_2 = _a.sent();
                    logout();
                    throw e_2;
                case 4:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); }, []);
    return (React.createElement(AuthContext.Provider, { value: {
            user: user,
            token: token,
            authenticate: authenticate,
            validateToken: validateToken,
            loading: loading,
            login: login,
            logout: logout,
        } }, children));
}
export default AuthProvider;
