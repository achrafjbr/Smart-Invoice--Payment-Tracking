import fournisseurService from "../services/fournisseurService.js";

const createFournisseur = async (requeset, response) => {
  const fournisseur = requeset.body;
  try {
    const result = await fournisseurService.createFournisseur(fournisseur);
    return response.status(result.statusCode).json(result);
  } catch (error) {
    console.error(error);
  }
};

const consulterFournisseurs = async (requeset, response) => {
  const userId = requeset.user.id;
  try {
    const result = await fournisseurService.consulterFournisseurs(userId);
    return response.status(result.statusCode).json(result);
  } catch (error) {
    console.error(error);
  }
};
const consulterFournisseurSpécifique = async (requeset, response) => {
  const fournisseurId = requeset.params.id;
  try {
    const result =
      await fournisseurService.consulterFournisseurSpécifique(fournisseurId);
    return response.status(result.statusCode).json(result);
  } catch (error) {
    console.error(error);
  }
};

const modifierFournisseur = async (requeset, response) => {
  const data = requeset.body;
  const fournisseurId = requeset.params.id;
  try {
    const result = await fournisseurService.modifierFournisseur(
      fournisseurId,
      data,
    );
    return response.status(result.statusCode).json(result);
  } catch (error) {
    console.error(error);
  }
};
const supprimerFournisseur = async (requeset, response) => {};
const filterFounrnisseurParNom = async (requeset, response) => {};

const fournisseurController = {
  createFournisseur,
  consulterFournisseurs,
  modifierFournisseur,
  supprimerFournisseur,
  filterFounrnisseurParNom,
  consulterFournisseurSpécifique,
};

export default fournisseurController;
