import paimentCotroller from "../controllers/paimentController.js";
import { Router } from "express";
import paimentValidation from "../middlewares/paimentValidations/invoiceAndPayment.js";

const paimentRouter = Router({ mergeParams: true });

paimentRouter.post(
  "/payments",
  paimentValidation.validatePaimentAmount,
  paimentValidation.validateOwnershipInvoice,
  paimentCotroller.enregistrerUnPaiement,
);

paimentRouter.get(
  "/payments",
  paimentCotroller.consulterListePaiementsDunefacture,
);

export default paimentRouter;
