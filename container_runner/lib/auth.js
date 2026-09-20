import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import connectDB from "../db/dbConnection.js";
const mongoConn = await connectDB();
const client = mongoConn.connection.getClient();
const db = client.db();
const auth = betterAuth({
    database: mongodbAdapter(db),
    advanced: {
        database: {
            joins: true
        }
    },
    trustedOrigins: [process.env.CLIENT_URL],
    socialProviders: {
        github: {
            clientId: process.env.AUTH_GITHUB_ID,
            clientSecret: process.env.AUTH_GITHUB_SECRET
        }
    }
});
export default auth;
//# sourceMappingURL=auth.js.map