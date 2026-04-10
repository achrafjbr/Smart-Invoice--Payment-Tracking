import { statistiqueParFournisseurService } from "../services/statisticsService.js";

const statistiqueParFournisseurController = async (request, response) => {
  const fournisseurId = request.params.id;
  const userId = request.user.id;
  try {
    const result = await statistiqueParFournisseurService(
      fournisseurId,
      userId,
    );
    response.status(result.statusCode).json(result);
  } catch (error) {
    console.error(error.message);
  }
};

export { statistiqueParFournisseurController };
