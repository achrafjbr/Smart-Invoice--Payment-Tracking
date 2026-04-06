import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import authenticationRouter from "./src/routes/authenticationRouter.js";
import PREFIX_ROUTE_PATH from "./src/utils/constants.js";
import fournisseurRouter from "./src/routes/fournisseurRouter.js";
import {
  authRoles,
  isAuthenticated,
} from "./src/middlewares/authentication.js";

const app = express();
dotenv.config();

app.use(express.json());

//Database Connection.
connectDB();

app.use(`${PREFIX_ROUTE_PATH}/auth`, authenticationRouter);

app.use(
  `${PREFIX_ROUTE_PATH}/suppliers`,
  isAuthenticated,
  authRoles("CLIENT, ADMIN"),
  fournisseurRouter,
);

app.listen(process.env.PORT || 3000, (err) => {
  if (!err) {
    console.log("Server Start...");
  } else {
    console.log("DB Error...", err.message);
  }
});
