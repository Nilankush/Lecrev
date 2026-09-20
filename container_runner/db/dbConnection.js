import mongoose from "mongoose";
export default async function connectDB() {
    try {
        const mongoConn = await mongoose.connect(process.env.MONGODB_URI);
        console.log("DB is connected");
        return mongoConn;
    }
    catch (error) {
        console.error(error);
        process.exit(1);
    }
    ;
}
;
//# sourceMappingURL=dbConnection.js.map