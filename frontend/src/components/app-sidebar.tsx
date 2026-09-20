import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger
} from "@/components/ui/sidebar";
import logo from "../assets/logo.svg";
import { Collapsible, CollapsibleTrigger } from "./ui/collapsible";
import { LogIn, LogOut, LogsIcon } from "lucide-react";
import { useNavigate, type NavigateFunction } from "react-router-dom";
import { authClient } from "@/lib/auth-client";
import { useContext } from "react";
import { OpenSignInContext } from "@/context/openSignInContext";
import { FaHome } from "react-icons/fa";
import {RiProjectorFill} from "react-icons/ri";
import { ProjectInfoContext } from "@/context/projectInfoContext";

export function AppSidebar() {

  const openSignInContext = useContext(OpenSignInContext);
  const projectInfoContext = useContext(ProjectInfoContext);

  if(!projectInfoContext){
  throw new Error("ProjectInfoContext must be used within a provider.");
  };

  const{projectInfo, setProjectInfo} = projectInfoContext;

  if(!openSignInContext){
    throw new Error("OpenSignInContext must be used within a provider.");
  };

  const{openSignIn, setOpenSignIn} = openSignInContext;

  const logOut = async() => {
    await authClient.signOut({
      fetchOptions:{
        onSuccess: ()=>{
          setOpenSignIn(true);
          navigate("/");
        }
      }
    });
  };

  const navigate: NavigateFunction = useNavigate();
      const {data} = authClient.useSession();
  
      const user = data?.user;

  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader className="border md:border-0">
        <div className="flex items-center justify-between">
          <SidebarTrigger/>
          <div className="flex items-center gap-2 md:hidden">
            <img src={logo} alt="logo" height={"15px"} width={"15px"}/>
            <h1 
            className="inline-block text-lg font-extrabold bg-linear-to-r from-[#8A2387] via-[#E94057] to-[#F27121] bg-clip-text text-transparent"
            >
            LECREV
            </h1>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="mt-10">
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarMenu>
              <Collapsible defaultOpen={false}>
                <SidebarMenuItem>
                  <CollapsibleTrigger>
                    <SidebarMenuButton 
                    onClick={()=>{
                      setProjectInfo({project_id:"",projectUrl:""});
                      navigate("/");}} 
                    className="w-50" 
                    tooltip="Home">
                      <FaHome/>
                      <span className="flex justify-center">Home</span>
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                </SidebarMenuItem>
              </Collapsible>
              <Collapsible defaultOpen={false}>
                <SidebarMenuItem>
                  <CollapsibleTrigger>
                    <SidebarMenuButton 
                    onClick={()=>{
                      setProjectInfo({project_id:"",projectUrl:""})
                      navigate("/projects")}} 
                    className="w-50" tooltip="Projects">
                      <RiProjectorFill />
                      <span className="flex justify-center">Projects</span>
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                </SidebarMenuItem>
              </Collapsible>
              <Collapsible defaultOpen={false}>
                <SidebarMenuItem>
                  <CollapsibleTrigger>
                    <SidebarMenuButton 
                    onClick={()=>{
                      setProjectInfo({project_id:"",projectUrl:""})
                      navigate("/logs")}} 
                    className="w-50" tooltip="Logs">
                      <LogsIcon />
                      <span className="flex justify-center">Logs</span>
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                </SidebarMenuItem>
              </Collapsible>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter>
        {user && (<div>
          <Collapsible defaultOpen={false}>
            <SidebarMenuItem>
              <CollapsibleTrigger>
                <SidebarMenuButton className="w-50" tooltip="Account" onClick={()=>navigate("/account")}>
                  <img className="rounded-full" src={user.image as string} alt="userLogo" width={"15px"} height={"15px"}/>
                  <span className="flex justify-center">{user.name}</span>
                </SidebarMenuButton>
              </CollapsibleTrigger>
            </SidebarMenuItem>
          </Collapsible>
          <Collapsible defaultOpen={false}>
            <SidebarMenuItem>
              <CollapsibleTrigger>
                <SidebarMenuButton onClick={logOut} className="w-50" tooltip="LogOut">
                  <LogOut/>
                  <span className="flex justify-center">LogOut</span>
                </SidebarMenuButton>
              </CollapsibleTrigger>
            </SidebarMenuItem>
          </Collapsible>
        </div>)}

        {!user && 
        (<Collapsible defaultOpen={false}>
          <SidebarMenuItem>
            <CollapsibleTrigger>
              <SidebarMenuButton onClick={()=>setOpenSignIn(true)} className="w-50" tooltip="SignUp">
                <LogIn/>
                <span>SignUp</span>
              </SidebarMenuButton>
            </CollapsibleTrigger>
          </SidebarMenuItem>
        </Collapsible>)}        
      </SidebarFooter>
    </Sidebar>
  );
};