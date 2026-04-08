import Facture from "../models/Facture.js";
import Paiment from "../models/Paiment.js";
import { errorMessage } from "../utils/error.js";

const updateFactureStatus = async (factureId, status) => {
  await Facture.findByIdAndUpdate(
    { _id: factureId },
    { status: status },
    { new: true },
  );
};
const enregistrerUnPaiement = async (payload) => {
  console.log("Payload", payload);

  const result = await Paiment.aggregate([
    { $match: { user: payload.userId, facture: payload.factureId } },
    { $group: { _id: null, totalPaid: { $sum: "$amount" } } },
  ]);

  const totalPaid = result[0]?.totalPaid ?? 0;
  if (totalPaid == 0) {
    await Paiment.create({
      ...payload.data,
      facture: payload.factureId,
      user: payload.userId,
    });
    await updateFactureStatus(payload.factureId, payload.status);
  } else if (totalPaid == payload.amount) {
    await Paiment.findByIdAndUpdate({}).exec();
  }
};

const consulterListePaiementsDunefacture = async () => {};

const paimentDAO = {
  enregistrerUnPaiement,
  consulterListePaiementsDunefacture,
};

export default paimentDAO;
