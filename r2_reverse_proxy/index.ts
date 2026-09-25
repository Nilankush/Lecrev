import express, {type Express} from "express";
import { proxyHandler } from "./proxy/proxy.js";


const PORT = process.env.PORT;

const app: Express  = express();

app.use("/:projectId",proxyHandler);

app.listen(PORT,()=>{
    console.log(`Reverse proxy is running on Port:${PORT}...`);    
})