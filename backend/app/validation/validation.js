const Joi = require('joi');

//@ USER VALIDATION
const userValidton = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().required().min(4).max(13),
    lastName: Joi.string().required().min(3).max(13),
    email: Joi.string().email().required().trim(),
    password: Joi.string().required(),
    role: Joi.string(),
    idDepartement: Joi.string().required(),
  });
  return schema.validate(data);
};

//@ TICKET VALIDATION
const ticketValidation = (data) => {
  const schema = Joi.object({
    titre: Joi.string().required(),
    type: Joi.string().required(),
    urgence: Joi.string().required(),
    discription: Joi.string().required(),
    etat: Joi.string(),
  });
  return schema.validate(data);
};

const loginValidations = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().trim(),
    password: Joi.string().required(),
  });
  return schema.validate(data);
};

//@ DEPARTEMENT VALIDATION
const dipartementValidation = (data) => {
  const schema = Joi.object({
    lastName: Joi.string().required(),
    responsable: Joi.string().required(),
  });
  return schema.validate(data);
};

module.exports = {
  userValidton,
  ticketValidation,
  dipartementValidation,
  loginValidations,
};
