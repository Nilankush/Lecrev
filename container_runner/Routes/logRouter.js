import express, {} from "express";
import authHandler from "../middleware/authHandler.js";
import { sendLogs } from "../Controllers/logRouterController.js";
const logRouter = express.Router();
logRouter.get("/:id", authHandler, sendLogs);
export default logRouter;
//# sourceMappingURL=logRouter.js.map