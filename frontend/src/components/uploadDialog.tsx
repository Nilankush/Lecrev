import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProjectInfoContext } from "@/context/projectInfoContext";
import axios, { type AxiosResponse } from "axios";
import { useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import EnvCreator from "./envCreator";

interface responseSchema{
  created_by: string;
  project_id: string;
  project_url: string
};

interface UploadDialogProps{
    openUploader: boolean;
    setOpenUploader: (openUploader: boolean)=>void;
    gitUrl: string;
    setGitUrl: (gitUrl:string)=>void;
    build_script: string;
    setBuild_script: (script:string)=>void
}

interface envSchema{
  name: string,
  value: string
};


export function UploadDialog({...props}: UploadDialogProps) {

  const[error, setError] = useState<string>("")
  const[env, setEnv] = useState<envSchema[]>([]);
  const[envCount, setEnvCount] = useState<string[]>([])

  const navigate = useNavigate();

  const projectInfoContext = useContext(ProjectInfoContext);

  if(!projectInfoContext){
    throw new Error("ProjectInfoContext must be used within a provider.");
  };

  const{projectInfo, setProjectInfo} = projectInfoContext;

  const uploader:()=>void = useCallback(async() => {
    if(!props.gitUrl){
      return setError("Please enter git url.")
    };
    if(!props.build_script){
      return setError("Please enter build script.")
    }
    if(env.length!==envCount.length){
      return setError("Please add the last env that you have entered.")
    };

    const res: AxiosResponse = await axios.post("http://localhost:5000/project",
      {
        gitUrl: props.gitUrl,
        projectId: projectInfo.project_id,
        buildScript: props.build_script,
        envs: env
      },
      {withCredentials: true}
    );
      
    if(res.status === 201){
        const data: responseSchema = res.data;
        setProjectInfo({
            project_id: data.project_id,
            projectUrl: data.project_url
        });
        setError("");
        props.setGitUrl("");
        props.setGitUrl("");
        setEnv([]);
        setEnvCount([]);
        return navigate("/uploadPage");
    };                
  },[props.gitUrl, props.build_script, projectInfo.project_id,env,envCount]);

  const onOpenChangeHandler = () =>{
    props.setOpenUploader(false);
    setError("");
    setProjectInfo({
      project_id: "",
      projectUrl: ""
    });
    setEnv([]);
    setEnvCount([]);
    props.setGitUrl("");
    props.setBuild_script("");
  };
  return (
    <Dialog open={props.openUploader} onOpenChange={onOpenChangeHandler}>
      <form>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Enter details:</DialogTitle>
            <DialogDescription>
              Deploy your project just by filling the inputs correctly.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="name-1">Project Name:</Label>
              <Input 
              id="name-1"
              name="project_id" 
              defaultValue={projectInfo.project_id}
              placeholder="Enter a project name (optional).."
              value={projectInfo.project_id} 
              onChange={(e)=>setProjectInfo({project_id: e.target.value, projectUrl: ""})}/>
            </Field>
            <Field>
              <Label htmlFor="url">Git Url *:</Label>
              <Input 
              id="url" 
              name="gitUrl"
              defaultValue={props.gitUrl}
              placeholder="Enter repo url (required).."
              value={props.gitUrl}
              onChange={(e)=>props.setGitUrl(e.target.value)}
              />
            </Field>
            <Field>
              <Label htmlFor="script">Build Script *:</Label>
              <Input 
              id="script"
              name="build_script" 
              defaultValue={props.build_script}
              placeholder="ex: npm run build (required).."
              value={props.build_script} 
              onChange={(e)=>props.setBuild_script(e.target.value)}/>
            </Field>
          </FieldGroup>
          <Button 
          variant={"default"} 
          onClick={()=>{
            if(envCount.length === env.length){
              setEnvCount(p=>[...p,"another"])
            };
          }}>
            Add .env
          </Button>
          {envCount && 
          <div className="flex flex-col gap-1 overflow-y-scroll scrollbar-thumb-accent max-h-30">
            {envCount.map((_,i)=>(
            <EnvCreator key={i} setEnv={setEnv} setError={setError}/>
            ))}
          </div>
          }
          <DialogFooter>
            {error && <p className="text-red-500">{error}</p>}
            <DialogClose render={<Button variant="outline">Cancel</Button>} />
            <Button 
            onClick={uploader}
            type="submit">
              Deploy
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
