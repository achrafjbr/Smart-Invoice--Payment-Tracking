import paimentCotroller from "../controllers/paimentController.js";
import { Router } from "express";
import paimentValidation from "../middlewares/paimentValidations/invoiceAndPayment.js";

const paimentRouter = Router({ mergeParams: true });

paimentRouter.post(
  "/payments",
  paimentValidation.validatePaimentAmount,
  paimentCotroller.enregistrerUnPaiement,
);
paimentRouter.get("/", paimentCotroller.consulterListePaiementsDunefacture);

export default paimentRouter;
