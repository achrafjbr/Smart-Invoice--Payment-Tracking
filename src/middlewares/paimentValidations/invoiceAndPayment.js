import Joi from "joi";
import { errorMessage } from "../../utils/error.js";

const validatePaimentAmount = (request, response, next) => {
  const {
    body: { amount },
  } = request;
  const { error } = Joi.object({
    amount: Joi.number().greater(0).positive(),
  }).validate({
    amount,
  });
  if (!error) {
    next();
  } else {
    response.status(422).json(errorMessage(422, error.details[0].message));
  }
};

const paimentValidation = {
  validatePaimentAmount,
};
export default paimentValidation;
