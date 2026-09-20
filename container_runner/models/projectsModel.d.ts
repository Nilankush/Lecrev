import mongoose from "mongoose";
declare const projectModel: mongoose.Model<{
    created_by: mongoose.Types.ObjectId;
    project_id: string;
    project_url: string;
}, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    created_by: mongoose.Types.ObjectId;
    project_id: string;
    project_url: string;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    created_by: mongoose.Types.ObjectId;
    project_id: string;
    project_url: string;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    created_by: mongoose.Types.ObjectId;
    project_id: string;
    project_url: string;
}, mongoose.Document<unknown, {}, {
    created_by: mongoose.Types.ObjectId;
    project_id: string;
    project_url: string;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    created_by: mongoose.Types.ObjectId;
    project_id: string;
    project_url: string;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, unknown, {
    created_by: mongoose.Types.ObjectId;
    project_id: string;
    project_url: string;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    created_by: mongoose.Types.ObjectId;
    project_id: string;
    project_url: string;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export default projectModel;
//# sourceMappingURL=projectsModel.d.ts.map