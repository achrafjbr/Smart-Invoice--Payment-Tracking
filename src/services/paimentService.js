import paimentDAO from "../dao/paimentDAO.js";

const enregistrerUnPaiement = async (payload) =>
  await paimentDAO.enregistrerUnPaiement(payload);

const consulterListePaiementsDunefacture = async () =>
  await paimentDAO.consulterListePaiementsDunefacture();

const paimentService = {
  enregistrerUnPaiement,
  consulterListePaiementsDunefacture,
};
export default paimentService;
