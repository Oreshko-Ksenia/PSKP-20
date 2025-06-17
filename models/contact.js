const fs = require('fs').promises;
const path = require('path');
const uuid = require('uuid');

let contacts = [];

async function loadContacts() {
    try {
        const data = await fs.readFile(path.join(__dirname, '../contacts.json'), 'utf8');
        contacts = JSON.parse(data);
    } catch (err) {
        console.error('Не удалось загрузить контакты:', err);
    }
}

loadContacts(); 

class Contact {
    getAllContacts = () => Promise.resolve(contacts);

    getContact = async (id) => {
        const contact = contacts.find(c => c.id === id);
        return contact ? contact : 'Not found';
    };

    addContact = async (name, phone) => {
        const newContact = { id: uuid.v4(), name, phone };
        contacts.push(newContact);
        await this.saveToFile();
        return newContact;
    };

    editContact = async (id, name, phone) => {
        const contact = contacts.find(c => c.id === id);
        if (contact) {
            contact.name = name;
            contact.phone = phone;
            await this.saveToFile();
            return contact;
        }
        throw new Error('Contact not found');
    };

    deleteContact = async (id) => {
        const index = contacts.findIndex(c => c.id === id);
        if (index !== -1) {
            contacts.splice(index, 1);
            await this.saveToFile();
        }
        return contacts;
    };

    saveToFile = async () => {
        try {
            await fs.writeFile(path.join(__dirname, '../contacts.json'), JSON.stringify(contacts, null, 4));
        } catch (err) {
            console.error('Ошибка записи файла:', err);
        }
    };
}

module.exports = Contact;