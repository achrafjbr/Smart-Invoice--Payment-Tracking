import Fournisseur from "../../models/Fournirsseur.js";
import { errorMessage } from "../../utils/error.js";
const existedEmail = (Model) => {
  return async (request, response, next) => {
    const isExisted = await Model.findOne({
      email: request.body.email,
    }, {email:1});
    if (isExisted) {
      return response
        .status(422)
        .json(errorMessage(422, "Email Already existed"));
    } else {
      next();
    }
  };
};

export default existedEmail;

