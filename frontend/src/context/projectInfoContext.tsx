import { createContext } from "react";

export interface ProjectInfoSchema{
    project_id: string;
    projectUrl: string
};

interface ProjectInfoContextSchema{
    projectInfo: ProjectInfoSchema;
    setProjectInfo: (projectInfo: ProjectInfoSchema)=>void
};

const initial: ProjectInfoContextSchema = {
    projectInfo: {
        project_id: "",
        projectUrl: ""
    },
    setProjectInfo: ()=>{}
}

 export const ProjectInfoContext = createContext<ProjectInfoContextSchema>(initial);