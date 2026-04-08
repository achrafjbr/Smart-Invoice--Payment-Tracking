import mongoose from "mongoose";

const paimentSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  paimentDate: { type: Date, default: Date.new },
  note: { type: String },
  mode_paiment: {
    type: String,
    enum: ["espèces", "chèque", "virement"],
    default: "espèces",
  },
  facture: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Facture",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Paiment = mongoose.model("Paiment", paimentSchema);

export default Paiment;
