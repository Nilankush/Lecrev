import {createAuthClient} from "better-auth/react";


export const authClient = createAuthClient({
    baseURL: import.meta.env.VITE_BETTER_AUTH_URL
});

export const githubSignIn = async() => {
            await authClient.signIn.social({
            provider: "github",
            callbackURL: import.meta.env.VITE_CALLBACK_URL
        });
    
    }; 
       
