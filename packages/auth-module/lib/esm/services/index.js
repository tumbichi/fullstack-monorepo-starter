import axios from 'axios';
export var axiosInstance = axios.create({
    headers: { 'Content-Type': 'application/json' },
});
export var handleAxiosError = function (error) {
    var _a;
    if (axios.isAxiosError(error)) {
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
export * from './auth.services';
