import fournisseurDAO from "../dao/fournisseurDAO.js";

const createFournisseur = async (fournisseur) =>
  await fournisseurDAO.createFournisseur(fournisseur);

const consulterFournisseurs = async (userId) =>
  await fournisseurDAO.consulterFournisseurs(userId);

const consulterFournisseurSpécifique = async (fournisseurId) =>
  await fournisseurDAO.consulterFournisseurSpécifique(fournisseurId);

const modifierFournisseur = async (fournisseurId, data) =>
  await fournisseurDAO.modifierFournisseur(fournisseurId, data);

const supprimerFournisseur = async (fournisseurId) => 
  await fournisseurDAO.supprimerFournisseur(fournisseurId);

const filterFounrnisseurParNom = async () => {};

const fournisseurService = {
  createFournisseur,
  consulterFournisseurs,
  modifierFournisseur,
  supprimerFournisseur,
  filterFounrnisseurParNom,
  consulterFournisseurSpécifique,
};

export default fournisseurService;
