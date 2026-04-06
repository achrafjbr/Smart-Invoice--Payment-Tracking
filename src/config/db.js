import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.URI);
  } catch (error) {
    console.log("error db", error.message);
  }
};

export default connectDB;
