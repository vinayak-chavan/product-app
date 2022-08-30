const joi = require("joi");
const errorResponse = require("../../utils/index");

const validation = joi.object({
  username: joi.string().min(3).max(20).trim(true).required(),
  emailID: joi.string().email().trim(true).required(),
  password: joi.string().min(6).trim(true).required(),
  phoneNumber: joi.string().min(10).max(10).trim(true).required(),
  designation: joi.string().trim(true).required(),
});

const userValidation = async (req, res, next) => {
  const payload = {
    username: req.body.username,
    emailID: req.body.emailID,
    password: req.body.password,
    phoneNumber: req.body.phoneNumber,
    designation: req.body.designation,
  };

  const { error } = validation.validate(payload);
  if (error) {
   return errorResponse(req, res, 'enter valid data', 406);
  } else {
    next();
  }
};
module.exports = userValidation;
