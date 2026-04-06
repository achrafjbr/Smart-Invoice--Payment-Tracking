import mongoose from "mongoose";

const factureSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  paimentDate: { type: Date, default: Date.new },
  note: { type: String },
  mode_paiment: {
    type: String,
    enum: ["espèces", "chèque, virement"],
    default: "espèces",
  },
  facture: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Fournisseur",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Fournisseur",
    required: true,
  },
});

const Facture = mongoose.model("Facture", factureSchema);

export default Facture;
