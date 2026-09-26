import axios from "axios";
import { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { RxGithubLogo } from "react-icons/rx";
import { Button } from "./ui/button";

interface RepoProps{
    userName: string;
    setGitUrl: (url: string)=>void;
    setOpenUpload: (openUpload:boolean)=>void
}

export default function RepoList({userName, setGitUrl, setOpenUpload}: RepoProps): React.JSX.Element{

    const[repoList, setRepoList] = useState<any>();

    const fetchRepo = async(user: string) => {        
        const res = await axios.get(`https://api.github.com/users/${user}/repos`);
        setRepoList(res.data);       
    };

    useEffect(()=>{
        fetchRepo(userName)
    },[])

    return(
        <div className="flex flex-col gap-4 items-center border rounded-2xl p-2">
            <div className="flex items-center gap-2">
                <p>Repositories from</p>
                <FaGithub/>
                {userName}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 text-sm">            
                {repoList?.map((repo: any, i: number)=>(
                    <div 
                    key={i} 
                    className="flex flex-col gap-2 border rounded-2xl px-4 py-2 hover:bg-accent-foreground hover:text-accent"
                    >
                        <div className="flex items-center justify-between">
                            <div className="text-xs border px-2 py-1 border-accent rounded-2xl">{repo.created_at.split("T")[0]}</div>
                            {repo.homepage && <div className="justify-center border px-2 py-1 text-xs rounded-2xl border-accent">Deployed</div>}
                        </div>
                        <div className={`flex items-center`}>
                            <RxGithubLogo/>
                            <p>{repo.name}</p>
                        </div>                       
                        {repo.homepage && 
                        (<div className="text-xs flex flex-col">
                            <p>Live Url:</p>
                            <a className="text-cyan-300 hover:underline whitespace-nowrap overflow-hidden mb-2" target="_blank" href={repo.homepage}>{repo.homepage}</a>
                        </div>)}
                        <Button
                        variant={"secondary"}
                        className={repo.homepage ? "mt-0" : "mt-12"} 
                        onClick={()=>{
                            if(userName){
                            setGitUrl(`https://github.com/${userName}/${repo?.name}`); 
                            setOpenUpload(true);
                            }}}>
                                Deploy
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
};