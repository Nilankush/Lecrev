import mongoose from "mongoose";
const logSchema = new mongoose.Schema({
    project_id: {
        type: String,
        required: true
    },
    logs: {
        type: [String],
        required: true
    }
});
const logModel = mongoose.model("logs", logSchema);
export default logModel;
//# sourceMappingURL=logsModel.js.map