const express = require('express');
const router = express.Router();
const contacts = require('../../models/contacts');
const validation = require('../../middlewares/validation');

router.get('/', async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    if (result) {
      res.json(result);
    } else {
      res.status(404).send({ message: 'Not found' });
    }
  } catch (error) {
    next(error);
  }
});

router.post(
  '/',
  validation.validateRequiredFields,
  validation.validateContactBody,
  async (req, res, next) => {
    try {
      const { name, email, phone } = req.body;
      const result = await contacts.addContact(name, email, phone);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
    if (result) {
      res.json({
        message: 'contact deleted',
      });
    } else {
      res.status(404).send({ message: 'Not found' });
    }
  } catch (error) {
    next(error);
  }
});

router.put(
  '/:contactId',
  validation.validateContactBody,
  async (req, res, next) => {
    try {
      const { contactId } = req.params;
      const result = await contacts.updateContact(contactId, req.body);
      if (result) {
        res.json(result);
      } else {
        res.status(404).send({ message: 'Not found' });
      }
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
