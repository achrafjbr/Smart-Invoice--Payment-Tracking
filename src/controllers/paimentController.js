import paimentService from "../services/paimentService.js";

const enregistrerUnPaiement = async (request, response) => {
  const factureId = request.params.id;
  const userId = request.user.id;
  const data = request.body;
  console.log("factureId", factureId);
  console.log("userId", userId);
  console.log("body", data);
  await paimentService.enregistrerUnPaiement(userId, factureId, data);
};

const consulterListePaiementsDunefacture = async (request, response) =>
  await paimentService.consulterListePaiementsDunefacture();

const paimentCotroller = {
  enregistrerUnPaiement,
  consulterListePaiementsDunefacture,
};

export default paimentCotroller;
