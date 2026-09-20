import httpProxy from "http-proxy";
import {type Request, type Response} from "express"

const proxy: httpProxy = httpProxy.createProxy();

const BASE_URL: string  = "https://pub-0c924e0663b345c2a2f5e69b2b308e13.r2.dev/outputs"

export const proxyHandler = (req: Request, res: Response) => {
    const hostname: string = req.hostname;   
    const projectId: string|undefined = hostname.split(".")[0]; 

    return proxy.web(req, res, {target: `${BASE_URL}/${projectId}`, changeOrigin: true});
};

proxy.on("proxyReq",(proxyReq , req, _)=>{
    const url: string|undefined = req.url;
        
    if(url === "/"){
        proxyReq.path += "index.html";        
    };
});