import express, {type Router } from "express";
import authHandler from "../middleware/authHandler.js";
import { sendLogs } from "../Controllers/logRouterController.js";

const logRouter: Router = express.Router();

logRouter.get("/:id", authHandler, sendLogs);

export default logRouter;