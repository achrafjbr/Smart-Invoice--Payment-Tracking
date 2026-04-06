import Joi from "joi";

const createFournisseur = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
});

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  passwordConfirmation: Joi.ref("password"),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const paramSchema = Joi.object({
  id: Joi.string().required(),
});

export { createFournisseur, loginSchema, registerSchema, paramSchema };
