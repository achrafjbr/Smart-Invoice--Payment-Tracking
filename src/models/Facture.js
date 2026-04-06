import mongoose from "mongoose";

const factureSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  dueDate: { type: Date, default: Date.new },
  description: { type: String },
  status: {
    type: String,
    enum: ["unPaid", "partialPaid, fullyPaid"],
    default: "unPaid",
  },
  fournisseur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Fournisseur",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Fournisseur",
  },
});

const Facture = mongoose.model("Facture", factureSchema);

export default Facture;
