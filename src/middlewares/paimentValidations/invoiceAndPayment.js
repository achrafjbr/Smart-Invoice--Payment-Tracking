import Joi from "joi";
import { errorMessage } from "../../utils/error.js";
import Facture from "../../models/Facture.js";
import Paiment from "../../models/Paiment.js";
import mongoose from "mongoose";

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
  } else if (isTheOwner) {
    const payload = {
      userId: request.user.id,
      factureId: id,
      status: status,
      amount: amount,
      data: request.body,
    };
    await isInvoiceAmountAppropriatePaymentAmount(payload, next, response);
  } else {
    return response
      .status(404)
      .json(errorMessage(404, "You have not an ivoice with this ID"));
  }
};

const isInvoiceAmountAppropriatePaymentAmount = async (
  payload,
  next,
  response,
) => {
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

  const result = await Paiment.aggregate([
    {
      $match: {
        facture: new mongoose.Types.ObjectId(payload.factureId),
      },
    },
    {
      $group: {
        _id: null,
        totalPaid: { $sum: "$amount" },
      },
    },
  ]);

  const totalPaid = result[0]?.totalPaid ?? 0;

  const remaining = payload.amount - totalPaid;

  if (payload.data.amount > remaining) {
    return response
      .status(422)
      .json(errorMessage(422, "Payment exceeds remaining amount"));
  }

  const newTotalPaid = totalPaid + payload.data.amount;

  if (newTotalPaid === 0) {
    response.locals.payload = { ...payload, status: "unPaid" };
    next();
  } else if (newTotalPaid < payload.amount) {
    response.locals.payload = { ...payload, status: "partialPaid" };
    next();
  } else {
    response.locals.payload = { ...payload, status: "fullyPaid" };
    next();
  }
};

const paimentValidation = {
  validatePaimentAmount,
  validateOwnershipInvoice,
};

export default paimentValidation;
