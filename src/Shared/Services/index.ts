import axios, { AxiosRequestConfig } from 'axios';
import { URL } from '../../Utils/constants';
import { onRequest, onRequestError } from './requestInterceptors';
import { onResponseError, onResponse } from './responseInterceptor';


export const API = axios.create({
    baseURL: URL,
    timeout: 30000,
});

API.interceptors.request.use(onRequest, onRequestError);
API.interceptors.response.use(onResponse, onResponseError);
export const getData = (url:string,config?: AxiosRequestConfig<any> | undefined) => {
    return API.get(url,config)
}

export const postData = (url: string, payload?: any, config?: AxiosRequestConfig<any> | undefined) => {
    return API.post(url, payload, config)
}

// export const updateData = (url, payload, config) => {
//     return API.put(url, payload, config)
// }

// export const deleteData = (url, config) => {
//     return API.delete(url, config)
// }