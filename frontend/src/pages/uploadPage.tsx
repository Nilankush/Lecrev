import { AppSidebar } from "@/components/app-sidebar";
import Header from "@/components/header";
import Logs from "@/components/logs";
import { Button } from "@/components/ui/button";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ProjectInfoContext } from "@/context/projectInfoContext";
import { useContext } from "react";
import { RiHome2Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

export default function UploadPage(){

    const navigate = useNavigate();

    const projectInfoContext = useContext(ProjectInfoContext);

    if(!projectInfoContext){
    throw new Error("ProjectInfoContext must be used within a provider.");
    };

    const{projectInfo, setProjectInfo} = projectInfoContext;

    return(
        <div>
            <SidebarProvider defaultOpen={false}>
                <AppSidebar/>
                <SidebarInset>
                    <main>
                        <Header/>
                        <div className="mt-5 flex flex-col items-center p-1 md:p-5">
                            <h1 className="text-2xl font-bold mb-2 md:mb-10">Uploading {projectInfo.project_id}...</h1>
                            <Logs project_id={projectInfo.project_id} projectUrl={projectInfo.projectUrl}/>
                            <div className="mt-5">
                                Return to Home:{" "} 
                                <Button 
                                variant={"secondary"} 
                                onClick={()=>{
                                    setProjectInfo({project_id:"",projectUrl:""});
                                    navigate("/")}}>
                                        <RiHome2Fill/>{" "}Home
                                </Button>
                            </div>
                        </div>
                    </main>
                </SidebarInset>
            </SidebarProvider>
        </div>

    );
};