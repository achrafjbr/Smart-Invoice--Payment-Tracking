import Facture from "../models/Facture.js";
import { errorMessage, successMessage } from "../utils/error.js";

const createFacture = async (facture) => {
  const factureCreated = await Facture.create(facture);
  if (!factureCreated) {
    return errorMessage(400, "Something went wrong. Try again");
  } else {
    return successMessage(201, factureCreated);
  }
};

const consulterSesFactures = async (userId) => {
  //Facture.deleteOne({ userid }).populate({ path: "fournisseur" }).deleteOne({ fournisseur });
  const factures = await Facture.find({ user: userId }, { __v: 0, user: 0 })
    .populate({
      path: "fournisseur",
      model: "Fournisseur",
      select: "name contact address phone email",
    })
    .lean();
  if (!factures) {
    return errorMessage(404, "No invoice found");
  } else {
    return successMessage(200, factures);
  }
};

const modifierUneFacture = async (userId, factureId, data) => {
  const updatedFacture = await Facture.findByIdAndUpdate(
    { userId: userId, _id: factureId },
    data,
    {
      new: true,
    },
  );
  if (!updatedFacture) {
    return errorMessage(400, "Something went wrong. Try again");
  } else {
    return successMessage(200, updatedFacture);
  }
};

const supprimerUneFacture = async (userId, factureId) => {
  //Facture.deleteOne({ userid }).populate({ path: "fournisseur" }).deleteOne({ fournisseur });
  const deletedFacture = await Facture.findByIdAndDelete({
    _id: factureId,
    userId: userId,
  });

  if (!deletedFacture) {
    return errorMessage(400, "Something went wrong. Try again");
  } else {
    return successMessage(200, deletedFacture);
  }
};

const filterFactureByStatus = async (status, userId) => {
  const facture = await Facture.findOne({ _id: userId, status: status });
  if (!facture) {
    return errorMessage(404, "No facture found");
  } else {
    return successMessage(200, facture);
  }
};

const factureDAO = {
  createFacture,
  consulterSesFactures,
  modifierUneFacture,
  supprimerUneFacture,
  filterFactureByStatus,
};

export default factureDAO;
