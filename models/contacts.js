const fs = require('fs/promises');
const path = require('path');
const uuid = require('uuid');
const contactsPath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async contactId => {
  try {
    const contacts = await listContacts();
    return contacts.find(({ id }) => id === contactId);
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async contactId => {
  try {
    const contacts = await listContacts();
    const changedCollection = contacts.filter(({ id }) => id !== contactId);
    if (changedCollection.length === contacts.length) {
      return null;
    }
    const deletedContact = contacts.filter(({ id }) => id === contactId);
    fs.writeFile(contactsPath, JSON.stringify(changedCollection));
    return deletedContact;
  } catch (error) {
    console.log(error);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const newContact = {
      id: uuid.v4(),
      name: name,
      email: email,
      phone: phone,
    };
    const contacts = await listContacts();
    const changedCollection = [...contacts, newContact];
    fs.writeFile(contactsPath, JSON.stringify(changedCollection));
    return newContact;
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const { name, email, phone } = body;
    const contacts = await listContacts();
    const [contact] = contacts.filter(contact => contact.id === contactId);
    if (typeof contact === 'undefined') {
      return null;
    }
    contact.name = typeof name !== 'undefined' ? name : contact.name;
    contact.email = typeof email !== 'undefined' ? email : contact.email;
    contact.phone = typeof phone !== 'undefined' ? phone : contact.phone;
    fs.writeFile(contactsPath, JSON.stringify(contacts));
    return contact;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
