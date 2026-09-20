import express, {} from "express";
import { projectCreateController, allProjectController, deleteProjectController } from "../Controllers/projectRouterController.js";
import authHandler from "../middleware/authHandler.js";
const projectRouter = express.Router();
projectRouter.post("/", authHandler, projectCreateController);
projectRouter.get("/allProjects", authHandler, allProjectController);
projectRouter.delete("/delete/:id/:prefix", authHandler, deleteProjectController);
export default projectRouter;
//# sourceMappingURL=projectRouter.js.map