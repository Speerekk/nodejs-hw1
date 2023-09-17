const yargs = require("yargs");
const contacts = require("./contacts");

yargs
  .command({
    command: "list",
    describe: "List all contacts",
    handler: () => {
      invokeAction("list");
    },
  })
  .command({
    command: "get <id>",
    describe: "Get a contact by ID",
    handler: (argv) => {
      invokeAction("get", { id: argv.id });
    },
  })
  .command({
    command: "add <name> <email> <phone>",
    describe: "Add a new contact",
    handler: (argv) => {
      invokeAction("add", {
        name: argv.name,
        email: argv.email,
        phone: argv.phone,
      });
    },
  })
  .command({
    command: "remove <id>",
    describe: "Remove a contact by ID",
    handler: (argv) => {
      invokeAction("remove", { id: argv.id });
    },
  })
  .demandCommand(1, "Используйте одну из доступных команд")
  .help().argv;

async function invokeAction(action, options) {
  try {
    switch (action) {
      case "list":
        const allContacts = await contacts.listContacts();
        console.log("Список контактов:");
        console.log(allContacts);
        break;

      case "get":
        const contactById = await contacts.getContactById(options.id);
        console.log("Контакт по ID:");
        console.log(contactById);
        break;

      case "add":
        const newContact = await contacts.addContact(
          options.name,
          options.email,
          options.phone
        );
        console.log("Новый контакт:");
        console.log(newContact);
        break;

      case "remove":
        const removedContact = await contacts.removeContact(options.id);
        console.log("Удаленный контакт:");
        console.log(removedContact);
        break;

      default:
        console.warn("\x1B[31m Неизвестный тип действия!");
    }
  } catch (error) {
    console.error("Ошибка:", error.message);
  }
}

(async () => {
  try {
    // Получение списка контактов
    const allContacts = await contacts.listContacts();
    console.log("Список контактов:");
    console.log(allContacts);

    // Получение контакта по ID
    const contactById = await contacts.getContactById(contacts);
    console.log("Контакт по ID:");
    console.log(contactById);

    // Удаление контакта по ID
    const deletedContact = await contacts.removeContact(contacts);
    console.log("Удаленный контакт:");
    console.log(deletedContact);

    // Добавление нового контакта
    const newContact = await contacts.addContact(
      "Имя",
      "email@example.com",
      "123-456-7890"
    );
    console.log("Новый контакт:");
    console.log(newContact);
  } catch (error) {
    console.error("Ошибка:", error.message);
  }
})();
