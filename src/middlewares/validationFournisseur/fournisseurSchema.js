import Joi from "joi";

const createFournisseurSchema = (request, response, next) => {
  const {
    body: { name, email },
  } = request;
  const { error } = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email(),
  }).validate({ name, email });
  if (!error) {
    next();
  } else {
    return response.status(422).json({ error: error.details[0].message });
  }
};

export { createFournisseurSchema };
