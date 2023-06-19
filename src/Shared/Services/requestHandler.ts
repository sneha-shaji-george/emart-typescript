import { API } from '.';

const requestHandler = (url, method, { data, params }) =>
    Promise.resolve(
        API.request({
            url,
            method,
            data,
            params,
        }),
    );

export default requestHandler;