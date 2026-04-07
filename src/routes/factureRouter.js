import { Router } from "express";
import factureController from "../controllers/factureController.js";
import { authRoles, isAuthenticated } from "../middlewares/authentication.js";

const factureRouter = Router();
factureRouter.use(isAuthenticated, authRoles("CLIENT", "ADMIN"));

factureRouter.post("/", factureController.createFacture);
factureRouter.get("/", factureController.consulterSesFactures);
factureRouter.get("/search/q", factureController.filterFactureByStatus);
factureRouter.put("/:id", factureController.modifierUneFacture);
factureRouter.delete("/:id", factureController.supprimerUneFacture);

export default factureRouter;
