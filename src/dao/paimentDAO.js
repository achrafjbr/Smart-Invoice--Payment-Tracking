const enregistrerUnPaiement = async (userId, factureId, data) => {
  // Check the facture belongs to the connected user.
  // Check the  the Paiment Amount is not equel 0 & not greather than the facture Amount
};

const consulterListePaiementsDunefacture = async () => {};

const paimentDAO = {
  enregistrerUnPaiement,
  consulterListePaiementsDunefacture,
};

export default paimentDAO;
