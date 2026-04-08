import paimentDAO from "../dao/paimentDAO.js";

const enregistrerUnPaiement = async (userId, factureId, data) =>
  await paimentDAO.enregistrerUnPaiement(userId, factureId, data);

const consulterListePaiementsDunefacture = async () =>
  await paimentDAO.consulterListePaiementsDunefacture();

const paimentService = {
  enregistrerUnPaiement,
  consulterListePaiementsDunefacture,
};
export default paimentService;
