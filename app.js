import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import authenticationRouter from "./src/routes/authenticationRouter.js";
import PREFIX_ROUTE_PATH from "./src/utils/constants.js";
import fournisseurRouter from "./src/routes/fournisseurRouter.js";
import factureRouter from "./src/routes/factureRouter.js";
import paimentRouter from "./src/routes/paimentRouter.js";
import statisticsRouter from "./src/routes/statisticsRouter.js";
const app = express();
dotenv.config();

app.use(express.json());

//Database Connection.
connectDB();

app.use(`${PREFIX_ROUTE_PATH}/auth`, authenticationRouter);

app.use(`${PREFIX_ROUTE_PATH}/suppliers`, fournisseurRouter);

app.use(`${PREFIX_ROUTE_PATH}/invoices`, factureRouter);

// id bellow refers to the specific invoice id
app.use(`${PREFIX_ROUTE_PATH}/invoices/:id`, paimentRouter);

app.use(`${PREFIX_ROUTE_PATH}/suppliers/:id/`, statisticsRouter);

app.listen(process.env.PORT || 3000, (err) => {
  if (!err) {
    console.log("Server Start...");
  } else {
    console.log("DB Error...", err.message);
  }
});
