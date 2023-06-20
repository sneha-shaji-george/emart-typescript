import { AxiosRequestConfig } from "axios";
export const onRequest = (config : AxiosRequestConfig) => {
    const request = {
      ...config,
      headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
        ...config.headers,
      },
      withCredentials: true,
    };
    return request;
  };
  
  export const onRequestError = (error : any ) => Promise.reject(error);
  