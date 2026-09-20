import { authClient } from "@/lib/auth-client";
import logo from "../assets/logo.svg";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Header from "@/components/header";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

export default function AccountPage(): React.JSX.Element{

    const navigate = useNavigate();

    const {data} = authClient.useSession();

    const user = data?.user;

    const logOut = async() => {
        await authClient.signOut({
            fetchOptions:{
            onSuccess: ()=>{
                navigate("/");
            }
            }
        });
    };

    return(
        <div>
            <SidebarProvider defaultOpen={false}>
                <AppSidebar/>
                <SidebarInset>
                <main>
                    <Header/>
                    {user ? (<div className="flex flex-col items-center mt-2 md:mt-4">
                        <div className="flex border-3 rounded-2xl mb-2 p-2">
                            <img src={logo} alt="Lecrev logo" width={"25px"} height={"25px"}/>
                            <h1 className="text-2xl">{user?.name}</h1>
                        </div>

                        <Separator/>
                        <div className="flex flex-col mt-2 gap-25 md:mt-5 border p-10 rounded-4xl">
                            <div className="text-sm">
                                Account created at :{" "} {user?.createdAt.toDateString()}
                            </div>
                            <div className="flex gap-4 items-center">
                                Your projects:
                                <Button onClick={()=>navigate("/projects")}>Browse projects</Button>
                            </div>
                            <Button variant={"destructive"} onClick={logOut}><LogOut/>Log Out</Button>
                        </div>
                    </div>) : null}
                </main>
                </SidebarInset>
            </SidebarProvider>
        </div>
    )
}