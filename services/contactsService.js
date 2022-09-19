const { Contact } = require('../db/contactModel');

const getContacts = async () => {
  const contacts = await Contact.find({});
  return contacts;
};

const getContactById = async contactId => {
  const contact = await Contact.findById(contactId);
  return contact;
};

const addContact = async ({ name, email, phone }) => {
  const contact = new Contact({ name, email, phone });
  await contact.save();
  return contact;
};

const deleteContactById = async contactId => {
  const result = await Contact.findByIdAndRemove(contactId);
  return result;
};

const changeContactById = async (contactId, { name, email, phone }) => {
  const result = await Contact.findByIdAndUpdate(
    contactId,
    {
      $set: { name, email, phone },
    },
    {
      new: true,
    }
  );
  return result;
};

const updateStatusContact = async (contactId, favorite) => {
  const result = await Contact.findByIdAndUpdate(
    contactId,
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
