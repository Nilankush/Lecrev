import { createContext } from "react";

interface OpenSignInContextSchema{
    openSignIn: boolean;
    setOpenSignIn: (openSignIn: boolean)=>void
};

const initial: OpenSignInContextSchema = {
    openSignIn: false,
    setOpenSignIn: ()=>{}
}

 export const OpenSignInContext = createContext<OpenSignInContextSchema>(initial);