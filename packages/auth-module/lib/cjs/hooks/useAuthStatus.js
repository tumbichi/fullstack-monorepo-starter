"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAuthStatus = void 0;
var react_1 = require("react");
var AuthContext_1 = __importDefault(require("../context/AuthContext/AuthContext"));
var useAuthStatus = function () {
    var context = (0, react_1.useContext)(AuthContext_1.default);
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
exports.useAuthStatus = useAuthStatus;
