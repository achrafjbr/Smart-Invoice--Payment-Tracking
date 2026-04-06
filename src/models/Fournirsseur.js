import mongoose from "mongoose";

const fournisseurSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    contact: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
    },
    phone: {
      type: String,
      minLength: 10,
    },
    address: mongoose.Schema.Types.Mixed,
  },
  { timestamps: true },
);

const Fournisseur = new mongoose.model("Fournisseur", fournisseurSchema);

export default Fournisseur;
