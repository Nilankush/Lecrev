import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

type logsProps = {
    project_id: string;
    projectUrl: string
};

export default function Logs({...props}:logsProps):React.JSX.Element{
    
    const[logs, setLogs] = useState<string[]>([]);

    const logRef = useRef<HTMLElement>(null);

    useEffect(()=>{
        
        const socket: Socket = io(import.meta.env.VITE_SERVER_URL,{transports:["websocket"]});

        const pushLogs = (log: string)=>{
            setLogs((prev)=>[...(prev ? prev : []),log]);            
        };

        socket.emit("subscribe",`logs:${props.project_id}`);

        socket.on("logs",pushLogs);

        return ()=>{
            socket.off("logs");
            socket.disconnect();
        }
    },[])
    useEffect(()=>{
        logRef.current?.scrollIntoView({behavior: "smooth"})
    },[logs])
    return(
        <div className="border rounded-2xl flex-col items-center w-full p-5">
            <div className="flex flex-col md:flex-row border justify-between px-2 py-1 items-center">
                <div>{props.project_id}</div>
                <div>
                    <p>Deployment Url: </p>{" "}<a className="text-cyan-300/70 hover:underline hover:pointer-coarse" href={props.projectUrl} target="_blank">{" "} {props.projectUrl}</a>
                </div>
            </div>
            {logs.length===0 ? (<div className="justify-center w-20 h-10 mt-5">fetching logs...</div>) : 
            ( <div className=" flex flex-col items-center mt-5 mx-2 md:px-20">
                <h2 className="flex justify-center border w-full md:w-250 lg:400">Logs</h2>
                <div>
                    <pre className="border-1.5 rounded-2xl p-1 flex flex-col overflow-y-scroll overflow-x-hidden w-90 md:w-250 h-45 scrollbar-thumb-accent scroll-fade">
                        {logs?.map((log,i)=>(
                            <code className="border px-1" ref={(logs.length-1 )=== i ? logRef : undefined} key={i}>{log}</code>
                        ))}
                    </pre>
                </div>
            </div>)}

        </div>
    );
};