const {
  getContacts,
  getContactById,
  addContact,
  deleteContactById,
  changeContactById,
  updateStatusContact,
} = require('../services/contactsService');

const getContactsController = async (req, res) => {
  const contacts = await getContacts();
  res.json({ contacts });
};

const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  res.json(contact);
};

const addContactController = async (req, res) => {
  const { name, email, phone } = req.body;
  const contact = await addContact({ name, email, phone });
  res.status(201).json(contact);
};

const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  await deleteContactById(contactId);
  res.json({
    message: 'contact deleted',
  });
};

const changeContactController = async (req, res) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;
  const result = await changeContactById(contactId, { name, email, phone });
  res.json(result);
};

const updateFavoriteByIdController = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const result = await updateStatusContact(contactId, favorite);
  res.json(result);
};

module.exports = {
  getContactsController,
  getContactByIdController,
  addContactController,
  deleteContactController,
  changeContactController,
  updateFavoriteByIdController,
};
