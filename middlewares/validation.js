const Joi = require('joi');
const { ValidationError } = require('../helpers/errors');

const requiredFieldsSchema = Joi.object().keys({
  name: Joi.required(),
  email: Joi.required(),
  phone: Joi.required(),
});

const contactSchema = Joi.object().keys({
  name: Joi.string().min(3).max(40),
  email: Joi.string().email({ tlds: false }),
  phone: Joi.string().pattern(/^\(([0-9]{3})\)([ ])([0-9]{3})([-])([0-9]{4})$/),
});

const favoriteSchema = Joi.object().keys({
  favorite: Joi.boolean().required(),
});

const validate = (schema, missingBodyMessage) => (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    res.status(400).send({ message: missingBodyMessage });
    return;
  }
  const { error } = schema.validate(req.body);
  if (error) {
    next(new ValidationError(error.details[0].message));
  } else {
    next();
  }
};

const validateRequiredFields = validate(requiredFieldsSchema, 'missing fields');
const validateContactBody = validate(contactSchema, 'missing fields');
const validateFavoriteBody = validate(favoriteSchema, 'missing field favorite');

module.exports = {
  validateRequiredFields,
  validateContactBody,
  validateFavoriteBody,
};
