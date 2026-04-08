import { Router } from "express";
import { createFournisseurSchema } from "../middlewares/validationFournisseur/fournisseurSchema.js";
import fournisseurController from "../controllers/fournisseurController.js";
import { authRoles, isAuthenticated } from "../middlewares/authentication.js";
import existedEmail from "../middlewares/validateEmailExistance/existedEmail.js";
import Fournisseur from "../models/Fournirsseur.js";
const fournisseurRouter = Router();

fournisseurRouter.use(isAuthenticated, authRoles("CLIENT", "ADMIN"));

fournisseurRouter.post(
  "/",
  createFournisseurSchema,
  existedEmail(Fournisseur),
  fournisseurController.createFournisseur,
);

fournisseurRouter.get("/", fournisseurController.consulterFournisseurs);

fournisseurRouter.get(
  "/:id", // id refers to fournissaur
  fournisseurController.consulterFournisseurSpécifique,
);

fournisseurRouter.get(
  "/search/names", // id refers to fournissaur
  fournisseurController.filterFounrnisseurParNom,
);

fournisseurRouter.put(
  "/:id", // id refers to fournissaur
  fournisseurController.modifierFournisseur,
);

fournisseurRouter.delete(
  "/:id", // id refers to fournissaur
  fournisseurController.supprimerFournisseur,
);

export default fournisseurRouter;
