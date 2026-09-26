import { ModeToggle } from "./mode_toggle";
import logo from "../assets/logo.svg";
import { SidebarTrigger } from "./ui/sidebar";
import { authClient } from "@/lib/auth-client";
import { useNavigate } from "react-router-dom";

export default function Header(): React.JSX.Element{

    const navigate = useNavigate();

    const {data} = authClient.useSession();

    const user = data?.user;
    return(
        <header className="sticky top-0 flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
            <div className="flex items-center justify-between px-1 md:px-5 py-1 bg-accent w-full">
                <div className="flex gap-2 items-center">
                    <SidebarTrigger className="md:hidden"/>
                    <img src={logo} alt="logo" height={"20px"} width={"20px"}/>
                    <h1 
                    className="inline-block text-lg md:text-3xl font-extrabold bg-linear-to-r from-[#8A2387] via-[#E94057] to-[#F27121] bg-clip-text text-transparent"
                    >
                    LECREV
                    </h1>
                </div>
                <div className="flex gap-2 items-center">
                    {user && 
                    <img 
                    className="rounded-full hidden md:flex cursor-pointer"
                    src={user.image as string} 
                    alt="userLogo" 
                    width={"30px"} 
                    height={"30px"}
                    onClick={()=>navigate("/account")}
                    />}
                    <ModeToggle/>
                </div>
            </div>
        </header>
    )
};