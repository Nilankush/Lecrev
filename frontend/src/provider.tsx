import { useState } from "react";
import { ThemeProvider } from "./components/theme_provider";
import { OpenSignInContext } from "./context/openSignInContext";
import { ProjectInfoContext, type ProjectInfoSchema } from "./context/projectInfoContext";


type ProviderProps = {
    children: React.ReactNode
}

export default function Provider({children}:ProviderProps){

    const[openSignIn, setOpenSignIn] = useState<boolean>(false);
    const[projectInfo, setProjectInfo] = useState<ProjectInfoSchema>({project_id:"",projectUrl:""});

    return(
        <div>
            <OpenSignInContext.Provider value={{openSignIn,setOpenSignIn}}>
            <ProjectInfoContext.Provider value={{projectInfo, setProjectInfo}}>    
                <ThemeProvider>
                    {children}
                </ThemeProvider>
            </ProjectInfoContext.Provider>
            </OpenSignInContext.Provider>
        </div>
    );
};