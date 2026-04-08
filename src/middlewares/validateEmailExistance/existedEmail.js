import { errorMessage } from "../../utils/error.js";
const existedEmail = (Model) => {
  return async (request, response, next) => {
    const isExisted = Promise.all([
      await Model.findOne({
        email: request.email,
      }),
    ]);
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

//const isExisted = await Model.findOne({ email: email }).exec();
// if (!isExisted) {
// return false;
//} else {
// return true;
// }
