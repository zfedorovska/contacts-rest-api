const contactsOperations = require('./contacts.js');

const { Command } = require('commander');
const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const contacts = await contactsOperations.listContacts();
      console.log(contacts);
      break;
    case 'get':
      const contact = await contactsOperations.getContactById(id);
      console.log(contact);
      break;
    case 'add':
      const addedContact = await contactsOperations.addContact(
        name,
        email,
        phone
      );
      console.log(addedContact);
      break;

    case 'remove':
      const removeContact = await contactsOperations.removeContact(id);
      console.log(removeContact);
      break;

    default:
      console.log('Unknown action type!');
  }
}

invokeAction(argv);
