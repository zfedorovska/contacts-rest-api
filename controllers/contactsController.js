const {
  getContacts,
  getContactById,
  addContact,
  deleteContactById,
  changeContactById,
  updateStatusContact,
} = require('../services/contactsService');

const getContactsController = async (req, res) => {
  const { _id: userId } = req.user;
  const { skip = 0, limit = 20 } = req.query;
  const contacts = await getContacts(userId, { skip, limit });
  res.json({ contacts, skip, limit });
};

const getContactByIdController = async (req, res) => {
  const { _id: userId } = req.user;
  const { contactId } = req.params;
  const contact = await getContactById(contactId, userId);
  res.json(contact);
};

const addContactController = async (req, res) => {
  const { _id: userId } = req.user;
  const { name, email, phone } = req.body;
  const contact = await addContact({ name, email, phone }, userId);
  res.status(201).json(contact);
};

const deleteContactController = async (req, res, next) => {
  const { _id: userId } = req.user;
  const { contactId } = req.params;
  await deleteContactById(contactId, userId);
  res.json({
    message: 'contact deleted',
  });
};

const changeContactController = async (req, res) => {
  const { _id: userId } = req.user;
  const { contactId } = req.params;
  const { name, email, phone } = req.body;
  const result = await changeContactById(
    contactId,
    { name, email, phone },
    userId
  );
  res.json(result);
};

const updateFavoriteByIdController = async (req, res) => {
  const { _id: userId } = req.user;
  const { contactId } = req.params;
  const { favorite } = req.body;
  const result = await updateStatusContact(contactId, favorite, userId);
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
