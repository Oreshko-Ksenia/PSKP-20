const fs = require('fs').promises;
const uuid = require('uuid');
let contacts = [];

try {
    const data = await fs.readFile('./contacts.json', 'utf8');
    contacts = JSON.parse(data);
} catch (err) {
    console.error('Не удалось загрузить контакты:', err);
}

class Contact {
    getAllContacts = async () => contacts;

    getContact = async id => contacts.find(c => c.id === id) || null;

    addContact = async (name, phone) => {
        const newContact = { id: uuid.v4(), name, phone };
        contacts.push(newContact);
        await this.saveToFile();
        return newContact;
    };

    editContact = async (id, name, phone) => {
        const contact = contacts.find(c => c.id === id);
        if (!contact) throw new Error('Контакт не найден');
        contact.name = name;
        contact.phone = phone;
        await this.saveToFile();
        return contact;
    };

    deleteContact = async id => {
        const len = contacts.length;
        contacts = contacts.filter(c => c.id !== id);
        if (contacts.length < len) await this.saveToFile();
    };

    saveToFile = async () => {
        await fs.writeFile('./contacts.json', JSON.stringify(contacts, null, 4));
    };
}

module.exports = Contact;