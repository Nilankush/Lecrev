import mongoose from "mongoose";
declare const logModel: mongoose.Model<{
    project_id: string;
    logs: string[];
}, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    project_id: string;
    logs: string[];
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    project_id: string;
    logs: string[];
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    project_id: string;
    logs: string[];
}, mongoose.Document<unknown, {}, {
    project_id: string;
    logs: string[];
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    project_id: string;
    logs: string[];
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, unknown, {
    project_id: string;
    logs: string[];
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    project_id: string;
    logs: string[];
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export default logModel;
//# sourceMappingURL=logsModel.d.ts.map