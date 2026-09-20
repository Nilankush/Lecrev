import mongoose from "mongoose";
const projectSchema = new mongoose.Schema({
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    project_id: {
        type: String,
        required: true
    },
    project_url: {
        type: String,
        required: true
    },
});
const projectModel = mongoose.model("projects", projectSchema);
export default projectModel;
//# sourceMappingURL=projectsModel.js.map