import { response } from "express";
import Facture from "../models/Facture.js";
import Paiment from "../models/Paiment.js";
import { errorMessage, successMessage } from "../utils/error.js";
import mongoose from "mongoose";

const updateFactureStatus = async (factureId, status) => {
  console.log("factureId", factureId);
  console.log("status", status);
  return await Facture.findByIdAndUpdate(
    { _id: factureId },
    { status: status },
    { new: true },
  );
};
const enregistrerUnPaiement = async (payload) => {
  console.log("Payload", payload);

  const payment = await Paiment.create({
    ...payload.data,
    facture: payload.factureId,
    user: payload.userId,
  });

  await updateFactureStatus(payload.factureId, payload.status);
  return successMessage(201, payment );
};

const consulterListePaiementsDunefacture = async (factureId) => {
  const { status, amount } = await Facture.findOne({ _id: factureId });
  const result = await Paiment.aggregate([
    {
      $match: {
        facture: new mongoose.Types.ObjectId(factureId),
      },
    },
    {
      $group: {
        _id: null,
        totalPaid: { $sum: "$amount" },
      },
    },
  ]);

  const totalPaid = result[0]?.totalPaid ?? 0;
  const remainingAmount = amount - totalPaid;
  const response = {
    status: status,
    totalPaid: totalPaid,
    remainingAmount: remainingAmount,
  };
  return successMessage(200, response);
};

const paimentDAO = {
  enregistrerUnPaiement,
  consulterListePaiementsDunefacture,
};

export default paimentDAO;
