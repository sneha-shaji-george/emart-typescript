import { AxiosError, AxiosResponse } from 'axios';
const HTTP_STATUS = {
    SUCCESS_A: 201,
    SUCCESS_B: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    FORBIDDEN: 403,
    SERVER_ERROR: 500,
    UNAUTHORIZED: 401,
}


export function onResponseError(error : AxiosError) {
    if (error.response?.status === HTTP_STATUS.SERVER_ERROR) {
        return Promise.reject(error.response.data);
    }
    if (error.response?.status === HTTP_STATUS.UNAUTHORIZED) {
        if (!(window.location.href === "http://localhost:3000/login" || window.location.href === "http://localhost:3000" || window.location.href === "http://localhost:3000/signup"))
        {
            window.location.href = "http://localhost:3000/login";
            return Promise.reject(error.response.data);
        }          
        return Promise.reject(error.response.data);
    }
    return Promise.reject(error.response && error.response.data);
}

export function onResponse(response : AxiosResponse) {
    if (response.status === HTTP_STATUS.SUCCESS_A || response.status === HTTP_STATUS.SUCCESS_B ) {
        return Promise.resolve(response.data);
    } else {
        return onResponseError(response.data);
    }
}
