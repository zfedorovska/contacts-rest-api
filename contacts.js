const fs = require('fs').promises;
const path = require('path');
const uuid = require('uuid');
const contactsPath = path.resolve('./db/contacts.json');

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    return contacts.find(({ id }) => id === contactId);
  } catch (error) {
    console.log(error.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const newContact = {
      id: uuid.v4(),
      name: name,
      email: email,
      phone: phone,
    };
    const allContacts = await listContacts();
    const changedCollection = [...allContacts, newContact];
    fs.writeFile(contactsPath, JSON.stringify(changedCollection));
    return newContact;
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const allContacts = await listContacts();
    const changedCollection = allContacts.filter(({ id }) => id !== contactId);
    fs.writeFile(contactsPath, JSON.stringify(changedCollection));
    return allContacts.filter(({ id }) => id === contactId);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
