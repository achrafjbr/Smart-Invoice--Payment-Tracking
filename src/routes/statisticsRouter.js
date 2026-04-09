import { Router } from "express";
import { statistiqueParFournisseurController } from "../controllers/statisticsController.js";

const statisticsRouter = Router({ mergeParams: true });

statisticsRouter.get("/stats", statistiqueParFournisseurController);

export default statisticsRouter;
