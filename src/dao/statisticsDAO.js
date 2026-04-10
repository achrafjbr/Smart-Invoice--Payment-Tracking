import mongoose from "mongoose";
import Facture from "../models/Facture.js";
import Fournisseur from "../models/Fournirsseur.js";
import { errorMessage, successMessage } from "../utils/error.js";
import Paiment from "../models/Paiment.js";

const statistiqueParFournisseurDAO = async (fournisseurId, userId) => {
  const fournisseur = await Fournisseur.findById(fournisseurId);
  if (!fournisseur) {
    return errorMessage(404, "No supplier found");
  }
  const hassAccess = await Facture.exists({
    user: userId,
    fournisseur: fournisseurId,
  });
  if (!hassAccess) {
    return errorMessage(404, "Forbiden");
  }

  const factures = await Facture.find({
    fournisseur: fournisseurId,
    user: userId,
  });

  const factureIds = factures.map((facture) => facture._id);

  const totalInvoices = factureIds.length;

  const totalAmount = factures.reduce(
    (acc, facture) => acc + facture.amount,
    0,
  );

  const totalPaymentPaid = await Paiment.aggregate([
    {
      $match: {
        user: new mongoose.Types.ObjectId(userId),
        facture: { $in: factureIds },
      },
    },
    {
      $group: { _id: null, totalPaid: { $sum: "$amount" } },
    },
  ]);

  const totalPaid = totalPaymentPaid[0]?.totalPaid || 0;

  const totalRemaining = totalAmount - totalPaid;

  console.log("totalAmount: ", totalAmount);

  const factureStatus = {
    partialPaid: 0,
    unPaid: 0,
    fullyPaid: 0,
  };
  factures.map((facture) => {
    if (facture.status === "partialPaid") {
      factureStatus.partialPaid++;
    } else if (facture.status === "fullyPaid") {
      factureStatus.fullyPaid++;
    } else {
      factureStatus.unPaid++;
    }
  });

  const globalUserFactures = await Facture.aggregate([
    { $match: { user: new mongoose.Types.ObjectId(userId) } },
    { $group: { _id: null, globalFacturesUserAmount: { $sum: "$amount" } } },
  ]);
  const globalUserFacturesAmount =
    globalUserFactures[0]?.globalFacturesUserAmount ?? 0;

  const persentage =
    globalUserFacturesAmount == 0
      ? 0
      : (totalAmount / globalUserFacturesAmount) * 100;

  return successMessage(200, {
    supplierId: fournisseur._id,
    supplierName: fournisseur.name,
    totalInvoices,
    totalAmount,
    totalPaid,
    totalRemaining,
    persentage,
    factureStatus,
  });
};

export { statistiqueParFournisseurDAO };
