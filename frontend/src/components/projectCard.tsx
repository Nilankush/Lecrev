import axios, { type AxiosResponse } from "axios";
import { Button } from "./ui/button";
import { FaTrash } from "react-icons/fa";

interface ProjectSchema{
    _id: string;
    created_by: string;
    project_id: string;
    project_url: string
}

interface ProjectPropsSchema{
    project: ProjectSchema;
    projects: ProjectSchema[];
    setProjects: (projects: ProjectSchema[])=>void
};

export default function ProjectCard({project, projects, setProjects}: ProjectPropsSchema): React.JSX.Element{

    const deleteProject = async() => {
        const res: AxiosResponse = await axios.delete(`http://localhost:5000/project/delete/${project._id}/${project.project_id}`,{withCredentials: true});
        if(res.status === 200){
            setProjects(projects.filter((each:ProjectSchema)=>each._id!==project._id));
            return alert(res.data.message);
        };
    };

    return(
        <div 
        className="border rounded-2xl flex flex-col gap-2 p-2">
            <div className="flex items-center justify-between">
                {project.project_id}
                <Button variant={"destructive"} onClick={deleteProject}><FaTrash/></Button>
            </div>
            <div>Live url:</div>
            <a target="_blank" 
            href={project.project_url} 
            className="text-cyan-300 hover:pointer-coarse hover:underline whitespace-nowrap overflow-hidden">
                {project.project_url}
            </a>
        </div>
    );
};