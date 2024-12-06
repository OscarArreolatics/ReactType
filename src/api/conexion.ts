const url: string=import.meta.env.VITE_API_URL;

interface Headers{
    [key: string]: string
}

const headers: Headers={
    'Access-Control-Allow-Origin':"*",
    'Access-Control-Allow-Methods': "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    'Access-Control-Allow-Headers': "Content-Type, Authorization, X-Requested-With",
    'Content-Type': 'application/json;charset=UTF-8',
    'Accept': 'application/json'
}
 
export default {url, headers}
