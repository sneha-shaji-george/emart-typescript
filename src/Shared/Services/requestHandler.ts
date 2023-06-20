import { API } from '.';

interface RequestHandler{
    data : any
    params: any
}

const requestHandler = (url:string, method:string, { data , params } : RequestHandler ) =>
    Promise.resolve(
        API.request({
            url,
            method,
            data,
            params,
        }),
    );

export default requestHandler;