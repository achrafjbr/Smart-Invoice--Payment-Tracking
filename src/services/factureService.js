import factureDAO from "../dao/factureDAO.js";

const createFacture = async (facture) =>
  await factureDAO.createFacture(facture);

const consulterSesFactures = async (userId) =>
  await factureDAO.consulterSesFactures(userId);

const modifierUneFacture = async (userId, factureId, data) =>
  await factureDAO.modifierUneFacture(userId, factureId, data);

const supprimerUneFacture = async (userId, factureId) =>
  await factureDAO.supprimerUneFacture(userId, factureId);

const filterFactureByStatus = async (status, userId) =>
  factureDAO.filterFactureByStatus(status, userId);

const factureService = {
  createFacture,
  consulterSesFactures,
  modifierUneFacture,
  supprimerUneFacture,
  filterFactureByStatus,
};

export default factureService;
