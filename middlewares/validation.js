const Joi = require('joi');

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

const validate = contactSchema => (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    res.status(400).send({ message: 'missing fields' });
    return;
  }
  const { error } = contactSchema.validate(req.body);
  if (error) {
    const errorMessage = error.details[0].message;
    res.status(400).send({ message: errorMessage });
  } else {
    next();
  }
};

const validateRequiredFields = validate(requiredFieldsSchema);
const validateContactBody = validate(contactSchema);

module.exports = {
  validateRequiredFields,
  validateContactBody,
};
