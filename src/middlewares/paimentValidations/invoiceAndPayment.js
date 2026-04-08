import Joi from "joi";
import { errorMessage } from "../../utils/error.js";
import Facture from "../../models/Facture.js";

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

const validateOwnershipInvoice = async (request, response, next) => {
  const isTheOwner = await Facture.findOne({ user: request.user.id });
  const { id, status, amount } = isTheOwner;
  if (status == "fullyPaid") {
    return response.status(422).json({
      statusCode: 422,
      message: "This invoice already paid",
    });
  }
  if (isTheOwner) {
    //next();

    const payload = {
      userId: request.user.id,
      factureId: id,
      status: status,
      amount: amount,
      data: request.body,
    };
    isInvoiceAmountAppropriatePaymentAmount(payload, next, response);
  } else {
    response
      .status(404)
      .json(errorMessage(404, "You have not an ivoice with this ID"));
  }
};

const isInvoiceAmountAppropriatePaymentAmount = (payload, next, response) => {
  if (payload.data.amount > payload.amount) {
    return response
      .status(404)
      .json(
        errorMessage(
          404,
          `Payment has been refused you must pay less than or equel ${payload.amount}`,
        ),
      );
  }
  if (payload.data.amount == payload.amount) {
    response.locals.payload = { ...payload, status: "fullyPaid" };
    next();
  } else if (payload.data.amount < payload.amount) {
    response.locals.payload = { ...payload, status: "partialPaid" };
    next();
  }
};

const paimentValidation = {
  validatePaimentAmount,
  validateOwnershipInvoice,
};

export default paimentValidation;
