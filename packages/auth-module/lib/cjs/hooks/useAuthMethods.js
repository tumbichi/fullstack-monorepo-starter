"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAuthMethods = void 0;
var react_1 = require("react");
var AuthContext_1 = __importDefault(require("../context/AuthContext/AuthContext"));
var useAuthMethods = function () {
    var context = (0, react_1.useContext)(AuthContext_1.default);
    if (context === undefined) {
        throw new Error('useAuthMethods must be used within a AuthProvider');
    }
    var login = context.login, validateToken = context.validateToken;
    return {
        login: login,
        validateToken: validateToken,
    };
};
exports.useAuthMethods = useAuthMethods;
