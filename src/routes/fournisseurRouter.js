import { Router } from "express";
import { createFournisseurSchema } from "../middlewares/validationAuth/fournisseurSchema.js";
import fournisseurController from "../controllers/fournisseurController.js";
const fournisseurRouter = Router();

fournisseurRouter.post(
  "/",
  createFournisseurSchema,
  fournisseurController.createFournisseur,
);

fournisseurRouter.get(
  "/",
  createFournisseurSchema,
  fournisseurController.consulterFournisseurs,
);

fournisseurRouter.get(
  "/:id", // id refers to fournissaur
  createFournisseurSchema,
  fournisseurController.consulterFournisseurSpécifique,
);

export default fournisseurRouter;
