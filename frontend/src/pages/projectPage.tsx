import { AppSidebar } from "@/components/app-sidebar";
import Header from "@/components/header";
import ProjectCard from "@/components/projectCard";
import SignInDialog from "@/components/signInDialog";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { OpenSignInContext } from "@/context/openSignInContext";
import { authClient }  from "@/lib/auth-client";
import axios, { type AxiosResponse } from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface ProjectSchema{
    _id: string;
    created_by: string;
    project_id: string;
    project_url: string
};

export default function ProjectPage():React.JSX.Element{ 

    const[projects, setProjects] = useState<ProjectSchema[]>([]);
    const[error, setError] = useState<string>("");

    const openSignInContext = useContext(OpenSignInContext);

    if(!openSignInContext){
    throw new Error("OpenSignInContext must be used within a provider.");
    };
    
    const{openSignIn, setOpenSignIn} = openSignInContext;

    const fetchProjects = async(user: any) => {
        if(user){
            const  res: AxiosResponse = await axios.get(`${import.meta.env.VITE_SERVER_URL}/project/allProjects`,{withCredentials: true});
            setProjects(res.data);
        };
    };

    const {data, isPending} = authClient.useSession();

    useEffect(()=>{
        if(!isPending){
        if(!data){
            setOpenSignIn(true);
            setError("If you want to see your existing projects or create your first one please sign up!");
        };
        };
    },[]);

    const user = data?.user

    useEffect(()=>{
        fetchProjects(user)
    },[user])

    return(
        <div>
            <SidebarProvider defaultOpen={false}>
                <AppSidebar/>
                <SidebarInset>
                <main>
                    <Header/>
                    <div className="p-2 md:p-4">
                        {openSignIn && <SignInDialog openDialog={openSignIn} closeDialog={setOpenSignIn}/>}
                        {error && <h1 className="text-red-500 flex justify-center">{error}</h1>}
                        {!error && 
                        (projects.length === 0 ? (<div className="flex justify-center mt-5 md:text-xl font-semibold border rounded-2xl mx-2 md:mx-10 py-2">
                            No projects found. <Link to={"/"} className="hover:underline hover:cursor-pointer text-cyan-300 italic font-light">Create your first one.</Link>
                            </div>) 
                        :
                        (<div className="border rounded-2xl">
                            <h1 className="flex justify-center text-2xl font-bold m-2">{user?.name}'s Projects</h1>
                            <Separator/>
                            <div 
                            className="grid grid-cols-1 md:grid-cols-3 gap-3 p-2 md:p-5 m-2 h-[80vh] md:h-[75vh] overflow-scroll scroll-fade scrollbar-thumb-accent">
                                {projects?.map((project: ProjectSchema, i: number)=>(
                                    <ProjectCard project={project} projects={projects} setProjects={setProjects} key={i}/>
                                ))}
                            </div>
                        </div>))}
                    </div>
                </main>
                </SidebarInset>
            </SidebarProvider>
        </div>
    );
};