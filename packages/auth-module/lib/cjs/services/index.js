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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleAxiosError = exports.axiosInstance = void 0;
var axios_1 = __importDefault(require("axios"));
exports.axiosInstance = axios_1.default.create({
    headers: { 'Content-Type': 'application/json' },
});
var handleAxiosError = function (error) {
    var _a;
    if (axios_1.default.isAxiosError(error)) {
        if ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) {
            var res = error.response.data;
            return {
                message: res.message,
                status: res.code,
                statusText: res.status,
            };
        }
        return {
            message: error.message,
            status: 500,
            statusText: error.code || 'Unexpected',
        };
    }
    else {
        return {
            status: 500,
            statusText: error.name || 'Error',
            message: error.message || 'Unexpected error',
        };
    }
};
exports.handleAxiosError = handleAxiosError;
__exportStar(require("./auth.services"), exports);
