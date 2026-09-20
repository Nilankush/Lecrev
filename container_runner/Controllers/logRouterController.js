import logModel from "../models/logsModel.js";
export const sendLogs = async (req, res) => {
    const id = req.params.id;
    const data = await logModel.find({ project_id: id });
    if (!data) {
        return res.status(404).json({ msg: "Not found" });
    }
    return res.status(200).json(data);
};
//# sourceMappingURL=logRouterController.js.map