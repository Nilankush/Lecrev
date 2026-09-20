import { FaPlus } from "react-icons/fa";
import { Button } from "./ui/button";

import { Input } from "./ui/input";
import { useState } from "react";


interface PropSchema{
    setError: (error: string)=>void;
    setEnv: (env: any)=>void
};

interface varSchema{
    name: string| undefined;
    value: string | undefined
};

export default function EnvCreator({setError,setEnv}:PropSchema):React.JSX.Element{

    const[variable, setVariable] = useState<varSchema>();

    return(
        <div className="flex gap-1">
            <Input 
            placeholder="Name" 
            onChange={(e)=>{setVariable({name: e.target.value, value: variable?.value})}}/>
            <Input placeholder="value" onChange={(e)=>setVariable({name: variable?.name, value: e.target.value})}/>
            <Button 
            onClick={()=>{
                if(!variable?.name || !variable.value){
                    return setError("please fill name and value both.")
                }
                setEnv((p: any)=>[...p,variable]);
                setError("");
                }}>
                <FaPlus/>
            </Button>
        </div>
    );
};