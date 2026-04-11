import factureService from "../services/factureService.js";

const createFacture = async (request, response) => {
  const user = request.user.id;
  const data = request.body;
  const facture = { ...data, user };
  try {
    const result = await factureService.createFacture(facture);
    return response.status(result.statusCode).json(result);
  } catch (error) {
    console.error(error);
  }
};

const consulterSesFactures = async (request, response) => {
  const userId = request.user.id;
  try {
    const result = await factureService.consulterSesFactures(userId);
    return response.status(result.statusCode).json(result);
  } catch (error) {
    console.error(error);
  }
};

const modifierUneFacture = async (request, response) => {
  const userId = request.user.id;
  const factureId = request.params.id;
  const data = request.body;
  try {
    const result = await factureService.modifierUneFacture(
      userId,
      factureId,
      data,
    );
    return response.status(result.statusCode).json(result);
  } catch (error) {
    console.error(error);
  }
};

const supprimerUneFacture = async (request, response) => {
  const userId = request.user.id;
  const factureId = request.params.id;

  try {
    const result = await factureService.supprimerUneFacture(userId, factureId);
    return response.status(result.statusCode).json(result);
  } catch (error) {
    console.error(error);
  }
};
const filterFactureByStatus = async (request, response) => {
  const {
    query: { status },
  } = request;
  const userId = request.user.id;
  try {
    const result = await factureService.filterFactureByStatus(status, userId);
    return response.status(result.statusCode).json(result);
  } catch (error) {
    console.error(error);
  }
};

const factureController = {
  createFacture,
  consulterSesFactures,
  modifierUneFacture,
  supprimerUneFacture,
  filterFactureByStatus,
};

export default factureController;
