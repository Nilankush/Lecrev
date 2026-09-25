import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import connectDB from "../db/dbConnection.js";


const mongoConn = await connectDB();

const client = mongoConn.connection.getClient();

const db = client.db();

const auth = betterAuth({
    baseURL:process.env.BETTER_AUTH_URL,
    database: mongodbAdapter(db),
    advanced:{
        database:{
            joins: true
        },
        defaultCookieAttributes:{
            sameSite: "none",
            secure: true,
            httpOnly:true
        },
        cookies:{
            state:{
                attributes:{
                    sameSite: "None",
                    secure: true,
                    httpOnly: true,
                    path:"/"
                }
            } 
        },
        useSecureCookies: true,
        ipAddress:{
            ipAddressHeaders:["x-forwarded-for", "x-real-ip", "cf-connecting-ip"],
        }, 
        trustedProxyHeaders: true       
    },
    rateLimit: {
        enabled: true
    },
    trustedOrigins: [ process.env.CLIENT_URL as string ],
    socialProviders:{
        github:{
            clientId: process.env.AUTH_GITHUB_ID as string,
            clientSecret: process.env.AUTH_GITHUB_SECRET as string
        }
    },
    session:{
        cookieCache:{
            enabled: true
        }, 
    }
});

export default auth;