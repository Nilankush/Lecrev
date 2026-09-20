import { useContext, useState } from "react";
import { Button } from "./ui/button";
import { OpenSignInContext } from "@/context/openSignInContext";
import { authClient } from "@/lib/auth-client";
import SignInDialog from "./signInDialog";
import RepoList from "./repoList";
import { UploadDialog } from "./uploadDialog";
import { Separator } from "./ui/separator";


export default function Home(): React.JSX.Element{

    const[gitUrl, setGitUrl] = useState<string>();
    const[openUploader, setOpenUploader] = useState<boolean>(false)
    const[build_script, setBuild_script] = useState<string>();

    const openSignInContext = useContext(OpenSignInContext);

    if(!openSignInContext){
        throw new Error("OpenSignInContext must be used within a provider.");
    };
    

    const{openSignIn, setOpenSignIn} = openSignInContext;

    const {data} = authClient.useSession();

    const user = data?.user;


    return(
        <div className="flex flex-col items-center w-full h-full p-2 md:p-5">
            <h1 className="mt-2 md:mt-10 text-xl md:text-3xl font-bold font-mono">
                DEPLOY YOUR PROJECTS
            </h1>
            <p 
            className="font-semibold mt-2 text-xs inline-block bg-linear-to-r from-[#8A2387] via-[#E94057] to-[#F27121] bg-clip-text text-transparent">
                Simple | Fast | Convenient
            </p>
            <div className="flex flex-col md:flex-row items-center gap-5 mt-8 mb-4 border py-1 px-3 rounded-2xl w-full justify-center">
                <h2>Deploy your projects manually :</h2>
                <Button 
                variant={"default"} 
                onClick={()=>{
                    if(user){
                        return setOpenUploader(true);
                    }
                    return setOpenSignIn(true);
                }}>
                    Upload
                </Button>
            </div>
            <Separator className="mb-2 md:mb-5"/>
            {openSignIn && <SignInDialog openDialog={openSignIn} closeDialog={setOpenSignIn}/>}
            <UploadDialog 
            gitUrl={gitUrl as string} 
            openUploader={openUploader}
            setGitUrl={setGitUrl}
            setOpenUploader={setOpenUploader}
            build_script={build_script as string}
            setBuild_script={setBuild_script}
            />
            {user && <RepoList userName={user.name} setGitUrl={setGitUrl} setOpenUpload={setOpenUploader}/>}
        </div>
    );
};