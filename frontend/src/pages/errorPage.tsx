import { AppSidebar } from "@/components/app-sidebar";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";


export default function ErrorPage():React.JSX.Element{
    return(
        <div>
            <SidebarProvider defaultOpen={false}>
            <AppSidebar/>
            <SidebarInset>
                <main>
                    <Header/>
                    <div className="mt-15 w-full h-full flex flex-col justify-center items-center">
                        <h1 className="text-red-500">[Code: 404]</h1>
                        <h1>Page not found.</h1>
                        <p>Please return to home.</p>
                        <Link to={"/"}><Button variant={"link"}><Home/>Home</Button></Link>
                    </div>
                </main>
            </SidebarInset>
            </SidebarProvider>

        </div>
    );
};