import Joi from "joi";

const registerSchema = (request, response, next) => {
  const {
    body: { name, email, password, passwordConfirmation },
  } = request;
  const { error } = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    passwordConfirmation: Joi.ref("password"),
  }).validate({ name, email, password, passwordConfirmation });
  if (!error) {
    next();
  } else {
    return response.status(402).json({ error: error.details[0].message });
  }
};

const loginSchema = (request, response, next) => {
  const {
    body: { email, password },
  } = request;
  const { error } = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }).validate({ email, password });
  if (!error) {
    next();
  } else {
    return response.status(400).json({ error: error.details[0].message });
  }
};

export { registerSchema, loginSchema };
