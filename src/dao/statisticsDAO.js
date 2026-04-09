import mongoose from "mongoose";
import Facture from "../models/Facture";

const statistiqueParFournisseurDAO = async (fournisseurId, userId) => {
  // totalInvoices
  Facture.aggregate([
    {
      $match: {
        facture: new mongoose.Types.ObjectId(fournisseurId),
        user: new mongoose.Types.ObjectId(userId),
      },
    },
  ]);
};
export { statistiqueParFournisseurDAO };
