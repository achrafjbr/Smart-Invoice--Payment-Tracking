import Facture from "../models/Facture.js";
import Paiment from "../models/Paiment.js";

const getFacturesEnRetard = async (userId) => {
  const facture = await Facture.find({
    user: userId,
    status: { $ne: "fullyPaid" },
    dueDate: { $gt: new Date(Date.now()) },
  }).populate({ path: fournisseur, select: "name email" });

  const paiment = Paiment.find({
    user: userId,
    facture: facture._id,
  });

  const data = {
    facture: facture,
  };
};

export default getFacturesEnRetard;
