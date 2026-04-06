import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import authenticationRouter from "./src/routes/authenticationRouter.js";
import PREFIX_ROUTE_PATH from "./src/utils/constants.js";

const app = express();
dotenv.config();

app.use(express.json());

//Database Connection.
connectDB();

app.use(`${PREFIX_ROUTE_PATH}/auth`, authenticationRouter);

app.listen(process.env.PORT || 3000, (err) => {
  if (!err) {
    console.log("Server Start...");
  } else {
    console.log("DB Error...", err.message);
  }
});
