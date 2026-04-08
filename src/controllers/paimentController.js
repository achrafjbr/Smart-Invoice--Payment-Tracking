import paimentService from "../services/paimentService.js";

const enregistrerUnPaiement = async (_, response) => {
  const {
    locals: { payload },
  } = response;
  await paimentService.enregistrerUnPaiement(payload);
};

const consulterListePaiementsDunefacture = async (request, response) =>
  await paimentService.consulterListePaiementsDunefacture();

const paimentCotroller = {
  enregistrerUnPaiement,
  consulterListePaiementsDunefacture,
};

export default paimentCotroller;
