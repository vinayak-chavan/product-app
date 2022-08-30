const joi = require("joi");
const { successResponse, errorResponse } = require("../../utils");

const validation = joi.object({
  name: joi.string().trim(true),
  price: joi.string().trim(true),
  quantity: joi.string().trim(true),
  description: joi.string().trim(true),
});

const productValidation = async (req, res, next) => {
  const payload = {
    name: req.body.name,
    price: req.body.price,
    quantity: req.body.quantity,
    description: req.body.description,
  };

  const { error } = validation.validate(payload);
  if (error) {
    console.log(error.message)
    return errorResponse(req, res, "enter valid data", 406);
  } else {
    next();
  }
};
module.exports = productValidation;
