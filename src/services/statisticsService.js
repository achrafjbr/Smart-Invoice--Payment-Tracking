import { statistiqueParFournisseurDAO } from "../dao/statisticsDAO.js";
const statistiqueParFournisseurService = async (fournisseurId, userId) =>
  await statistiqueParFournisseurDAO(fournisseurId, userId);

export { statistiqueParFournisseurService };
