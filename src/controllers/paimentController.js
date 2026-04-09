import paimentService from "../services/paimentService.js";

const enregistrerUnPaiement = async (_, response) => {
  const {
    locals: { payload },
  } = response;
  try {
    const result = await paimentService.enregistrerUnPaiement(payload);
    return response.status(result.statusCode).json(result);
  } catch (error) {
    console.error(error.message);
  }
};

const consulterListePaiementsDunefacture = async (request, response) => {
  const factureId = request.params.id;
  try {
    const result =
      await paimentService.consulterListePaiementsDunefacture(factureId);
    return response.status(result.statusCode).json(result);
  } catch (error) {
    console.error(error.message);
  }
};

const paimentCotroller = {
  enregistrerUnPaiement,
  consulterListePaiementsDunefacture,
};

export default paimentCotroller;
