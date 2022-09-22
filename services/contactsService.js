const { Contact } = require('../db/contactModel');

const getContacts = async (userId, { skip, limit }) => {
  const result = await Contact.find({ owner: userId })
    .populate('owner', 'email subscription')
    .skip(parseInt(skip))
    .limit(parseInt(limit));
  return result;
};

const getContactById = async (contactId, ownerId) => {
  const contact = await Contact.findOne({ _id: contactId, ownerId });
  return contact;
};

const addContact = async ({ name, email, phone }, owner) => {
  const contact = new Contact({ name, email, phone, owner });
  await contact.save();
  return contact;
};

const deleteContactById = async (contactId, ownerId) => {
  const result = await Contact.findOneAndRemove({ _id: contactId, ownerId });
  return result;
};

const changeContactById = async (contactId, { name, email, phone }, owner) => {
  const result = await Contact.findOneAndUpdate(
    { _id: contactId, owner },
    {
      $set: { name, email, phone },
    },
    {
      new: true,
    }
  );
  return result;
};

const updateStatusContact = async (contactId, favorite, owner) => {
  const result = await Contact.findOneAndUpdate(
    { _id: contactId, owner },
    {
      $set: { favorite },
    },
    { new: true }
  );
  return result;
};

module.exports = {
  getContacts,
  getContactById,
  addContact,
  deleteContactById,
  changeContactById,
  updateStatusContact,
};
