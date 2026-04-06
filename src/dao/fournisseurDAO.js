import Facture from "../models/Facture.js";
import Fournisseur from "../models/Fournirsseur.js";
import User from "../models/User.js";
import { errorMessage, successMessage } from "../utils/error.js";

const createFournisseur = async (fournisseur) => {
  const newFournisseur = await Fournisseur.create(fournisseur);
  if (!newFournisseur) {
    return errorMessage(500, "Something went wrong. Please try again");
  } else {
    return successMessage(201, newFournisseur);
  }
};

const consulterFournisseurs = async (userid) => {
  const data = Facture.find({ user: userid }).populate("fournisseur");
  if (!data) {
    return errorMessage(404, "No suplier found");
  } else {
    return successMessage(200, data);
  }
};

const consulterFournisseurSpécifique = async (fournisseurId) => {
  const fournisseur = Fournisseur.find({ _id: fournisseurId });
  if (!fournisseur) {
    return errorMessage(404, "No suplier found");
  } else {
    return successMessage(200, fournisseur);
  }
};

const modifierFournisseur = async (fournisseurId, data) => {
  const fournisseur = Fournisseur.find({ _id: fournisseurId });
  if (!fournisseur) {
    return errorMessage(404, "No suplier found");
  } else {
    return successMessage(200, fournisseur);
  }
};
const supprimerFournisseur = async (fournisseurId) => {
  const deletedFournisseur = Fournisseur.findOneAndDelete(
    {_id: fournisseurId },
  );
  if (!deletedFournisseur) {
    return errorMessage(402, "Something went wrong");
  } else {
    return successMessage(200, deletedFournisseur);
  }
};
const filterFounrnisseurParNom = async () => {};

const fournisseurDAO = {
  createFournisseur,
  consulterFournisseurs,
  modifierFournisseur,
  supprimerFournisseur,
  filterFounrnisseurParNom,
  consulterFournisseurSpécifique,
};

export default fournisseurDAO;
