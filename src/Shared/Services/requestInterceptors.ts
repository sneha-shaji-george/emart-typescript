export const onRequest = (config) => {
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
  
  export const onRequestError = (error) => Promise.reject(error);
  