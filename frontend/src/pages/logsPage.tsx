import { AppSidebar } from "@/components/app-sidebar";
import Header from "@/components/header";
import LogBox from "@/components/logBox";
import SignInDialog from "@/components/signInDialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { OpenSignInContext } from "@/context/openSignInContext";
import axios, { type AxiosResponse } from "axios";
import { ChevronDown, ChevronUp, HistoryIcon } from "lucide-react";
import { useContext, useEffect, useState } from "react";

interface ProjectSchema{
    _id: string,
    created_by: string,
    project_id: string,
    project_url: string,
    __v: number
}

export default function LogsPage():React.JSX.Element{

    const[projects, setProjects] =  useState<ProjectSchema[]>([]);
    const[isActive, setIsActive] = useState<string|null>(null);

    const openSignInContext = useContext(OpenSignInContext);

    if(!openSignInContext){
        throw new Error("OpenSignIn Context must be used within a provider.");
    };

    const fetchProjects = async() => {
        const res : AxiosResponse = await axios.get(`${import.meta.env.VITE_SERVER_URL}/project/allProjects`,{withCredentials: true});
        setProjects(res.data);
    };

    useEffect(()=>{
        fetchProjects()
    },[])
    return(
        <div>
            <SidebarProvider defaultOpen={false}>
                <AppSidebar/>
                <SidebarInset>
                <main>
                    <Header/>
                    <div className="flex flex-col m-2 md:m-5 border rounded-2xl p-1 md:p-4">
                        {openSignInContext.openSignIn && <SignInDialog openDialog={openSignInContext.openSignIn} closeDialog={openSignInContext.setOpenSignIn}/>}
                        <h1 className="flex items-center justify-center sticky"><HistoryIcon/>Logs History</h1>
                        <Separator/>
                        <div className="flex flex-col gap-2 md:gap-4 mt-2 overflow-scroll scroll-fade scrollbar-thumb-accent h-[80vh] md:h-[75vh]">
                            {projects.length===0 ? 
                            (<div className="text-red-500 flex justify-center">No Project Found!</div>) 
                            : (projects.map((project,i)=>(
                            <div 
                            className="flex flex-col border p-2 md:px-10 md:py-3 rounded-2xl"
                            key={i}>
                                <div className="flex items-center justify-between">
                                    <h2>{project.project_id}</h2>
                                    <Button 
                                    onClick={()=>setIsActive(isActive===project.project_id ? null : project.project_id)}
                                    variant={"ghost"}>
                                    {isActive===project.project_id ? <ChevronUp/> : <ChevronDown/>}</Button>
                                </div>
                                {(isActive===project.project_id) && <LogBox project_id={project.project_id}/>}
                            </div>
                            )))}
                        </div>
                    </div>
                </main>
                </SidebarInset>
            </SidebarProvider>
        </div>
    );
};