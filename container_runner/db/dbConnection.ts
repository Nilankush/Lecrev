import mongoose from "mongoose";

export default async function connectDB(){
    try {
        const mongoConn: typeof mongoose = await mongoose.connect(process.env.MONGODB_URI as string);
        console.log("DB is connected");
        return mongoConn;
    } catch (error) {
        console.error(error);
        process.exit(1);        
    };
};


