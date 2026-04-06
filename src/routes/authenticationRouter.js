import { Router } from "express";
const authenticationRouter = Router();
import {
  loginSchema,
  registerSchema,
} from "../middlewares/validationAuth/authSchema.js";
import { register, login } from "../controllers/authenticationController.js";
import { errorMessage, successMessage } from "../utils/error.js";
import { isAuthenticated } from "../middlewares/authentication.js";

authenticationRouter.post("/register", registerSchema, register);
authenticationRouter.post("/login", loginSchema, login);
authenticationRouter.get("/me", isAuthenticated, (request, response) => {
  const currentUser = request.user;
  if (!currentUser) {
    const error = errorMessage(401, "UnAuthorized");
    return response.status(error.statusCode).json(error.message);
  } else {
    const success = successMessage(200, currentUser);
    return response.status(success.statusCode).json(success);
  }
});

export default authenticationRouter;
