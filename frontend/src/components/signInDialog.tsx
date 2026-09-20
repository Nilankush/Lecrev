import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import logo from "../assets/logo.svg";
import { Button } from "./ui/button";
import { FaGithub } from "react-icons/fa";
import { githubSignIn } from "@/lib/auth-client";

interface SignInDialogProps{
    openDialog: boolean;
    closeDialog: (openDialog: boolean)=>void;
}

export default function SignInDialog({openDialog, closeDialog}:SignInDialogProps): React.JSX.Element{

    return(
            <Dialog open={openDialog} onOpenChange={()=>closeDialog(false)}>
                <DialogContent>
                    <DialogHeader>
                    <DialogTitle className="justify-center items-center flex flex-col gap-2 mb-5">
                        <div className="flex gap-2 items-center text-xl mb-2">
                            <img src={logo} alt="LOGO" height={"20px"} width={"20px"}/>
                            LECREV
                        </div>
                        
                        You need to sign up in order to deploy your project.
                    </DialogTitle>
                    <DialogDescription className="flex justify-center">
                        <Button onClick={githubSignIn} variant={"outline"}><FaGithub/>GITHUB</Button>
                    </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
    )
};