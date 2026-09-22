import express from "express";
import projectRouter from "./Routes/projectRouter.js";
import {Server} from "socket.io"
import {Redis} from "ioredis";
import cors from "cors";
import connectDB from "./db/dbConnection.js";
import { toNodeHandler } from "better-auth/node";
import auth from "./lib/auth.js";
import logModel from "./models/logsModel.js";
import logRouter from "./Routes/logRouter.js";
import { createServer } from "http";
const PORT = process.env.PORT
const app = express();


app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials:true
}));

const consumer = new Redis(process.env.REDIS_URL as string);

const httpServer = createServer(app);

const ioServer = new Server(httpServer,{cors:{
    origin: process.env.CLIENT_URL,
    methods: ["GET","POST"]
}});

ioServer.on("connection", socket=>{
 socket.on("subscribe",(channel)=>{
    socket.join(channel);
    socket.emit("logs");
 })
});

app.all("/auth/*any", toNodeHandler(auth));

app.use(express.json());

app.use("/project",projectRouter);
app.use("/logs",logRouter);

let buffer: any[] = [];

async function flush() {
  if (buffer.length === 0) return;
  const batch = buffer;
  buffer = [];

  try {

    await logModel.create({
        project_id: batch[0].projectId,
        logs: batch.map((each)=>each.logs)
    });

  } catch (err) {
    console.error("Network error on sending logs.", err);
  }
}

async function valkeySubscribe() {
    console.log("Subscribed to logs.");
    await consumer.psubscribe("logs:*");
    consumer.on("pmessage",(pattern,channel,message)=>{
        const stringMessage = message.toString();
        const{projectId,logs} = JSON.parse(stringMessage);
        ioServer.to(channel).emit("logs",logs);
        try {
            buffer.push({projectId,logs});
        } catch (err) {
            console.error("Bad log message:", err);
        };     
    });

    setInterval(flush,30000)
};

await valkeySubscribe();

process.on("SIGTERM", flush);

await connectDB();

httpServer.listen(PORT,()=>{
    console.log("Container runner server is running...");
    console.log("socket server is running...");
        
});
