import existedEmail from "../middlewares/validateEmailExistance/existedEmail.js";
import Facture from "../models/Facture.js";
import Fournisseur from "../models/Fournirsseur.js";
import User from "../models/User.js";
import { errorMessage, successMessage } from "../utils/error.js";

const createFournisseur = async (fournisseur) => {
  //const isExisted = await existedEmail(fournisseur.email, Fournisseur);
  const newFournisseur = await Fournisseur.create(fournisseur);
  if (!newFournisseur) {
    return errorMessage(500, "Something went wrong. Please try again");
  } else {
    return successMessage(201, newFournisseur);
  }
};

const consulterFournisseurs = async (userid) => {
  const data = await Facture.find({ user: userid }).populate("fournisseur")
    .select('[fournisseur]');
  if (data.length <= 0) {
    return errorMessage(404, "No suplier found");
  } else {
    return successMessage(200, data);
  }
};

const consulterFournisseurSpécifique = async (fournisseurId) => {
  const fournisseur = await Fournisseur.findOne({ _id: fournisseurId });
  //const fournisseur = await Facture.findOne({ user: '69d4bdcd7903ea03f3061cce', fournissuer: fournisseurId });
  if (!fournisseur) {
    return errorMessage(404, "No suplier found");
  } else {
    return successMessage(200, fournisseur);
  }
};

const modifierFournisseur = async (fournisseurId, data) => {
  const updatedFournisseur = await Fournisseur.findByIdAndUpdate(
    { _id: fournisseurId },
    data,
    { new: true },
  );
  if (!updatedFournisseur) {
    return errorMessage(404, "No suplier found");
  } else {
    return successMessage(200, updatedFournisseur);
  }
};

const supprimerFournisseur = async (fournisseurId, userId) => {
  const deletedFournisseur = await Fournisseur.findOneAndDelete({
    userId: userId,
    _id: fournisseurId,
  });
  if (!deletedFournisseur) {
    return errorMessage(402, "Something went wrong");
  } else {
    return successMessage(200, deletedFournisseur);
  }
};

const filterFounrnisseurParNom = async (name) => {
  const fournisseurs = await Fournisseur.find({ name: name }).exec();
  if (fournisseurs.length <= 0) {
    return errorMessage(404, "No suplier found");
  } else {
    return successMessage(200, fournisseurs);
  }
};

const fournisseurDAO = {
  createFournisseur,
  consulterFournisseurs,
  modifierFournisseur,
  supprimerFournisseur,
  filterFounrnisseurParNom,
  consulterFournisseurSpécifique,
};

export default fournisseurDAO;
