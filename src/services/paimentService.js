import paimentDAO from "../dao/paimentDAO.js";

const enregistrerUnPaiement = async (payload) =>
  await paimentDAO.enregistrerUnPaiement(payload);

const consulterListePaiementsDunefacture = async (factureId) =>
  await paimentDAO.consulterListePaiementsDunefacture(factureId);

const paimentService = {
  enregistrerUnPaiement,
  consulterListePaiementsDunefacture,
};
export default paimentService;
