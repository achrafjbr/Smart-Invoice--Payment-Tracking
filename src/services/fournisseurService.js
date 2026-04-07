import fournisseurDAO from "../dao/fournisseurDAO.js";

const createFournisseur = async (fournisseur) =>
  await fournisseurDAO.createFournisseur(fournisseur);

const consulterFournisseurs = async (userId) =>
  await fournisseurDAO.consulterFournisseurs(userId);

const consulterFournisseurSpécifique = async (fournisseurId) =>
  await fournisseurDAO.consulterFournisseurSpécifique(fournisseurId);

const modifierFournisseur = async (fournisseurId, data) =>
  await fournisseurDAO.modifierFournisseur(fournisseurId, data);

const supprimerFournisseur = async (fournisseurId, userId) =>
  await fournisseurDAO.supprimerFournisseur(fournisseurId, userId);

const filterFounrnisseurParNom = async (name) =>
  await fournisseurDAO.filterFounrnisseurParNom(name);

const fournisseurService = {
  createFournisseur,
  consulterFournisseurs,
  modifierFournisseur,
  supprimerFournisseur,
  filterFounrnisseurParNom,
  consulterFournisseurSpécifique,
};

export default fournisseurService;
