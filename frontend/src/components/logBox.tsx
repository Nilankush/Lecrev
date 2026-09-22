import axios from "axios";
import { useEffect, useState } from "react";

interface PropSchema{
    project_id: string
}
export default function LogBox({project_id}: PropSchema):React.JSX.Element{

    const[logs, setLogs] = useState<string[]>([]);

    const fetchLogs = async() => {        
        const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/logs/${project_id}`,{withCredentials: true});
        console.log(res.data);

        if(res.data.length > 1){  
            return res.data.map((e:any)=>e.logs.map((each: any)=>setLogs((p)=>[...p,each])));
        };
        return setLogs(res.data[0].logs);              
    };

    useEffect(()=>{
        fetchLogs();
    },[])
    return(
        <div>
            <h1 className="flex justify-center">Logs</h1>
            <div className="mb-2 h-50 overflow-scroll scroll-fade scrollbar-thumb-border flex flex-col border rounded-2xl">
                {logs?.map((log)=>(
                <code className="border px-1 md:px-3">{log}</code>
                ))}
                {!logs && <div className="text-red-500 flex justify-center items-center">Not Found!</div>}
            </div>
        </div>

    );
};