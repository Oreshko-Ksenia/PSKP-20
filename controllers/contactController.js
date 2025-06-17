const Contact = require('../models/contact');
const contactService = new Contact();

const getAllContactsApi = async (req, res) => {
    try {
        const contacts = await contactService.getAllContacts();
        res.json(contacts);
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const addContactApi = async (req, res) => {
    try {
        const { name, phone } = req.body;
        const newContact = await contactService.addContact(name, phone);
        res.status(201).json(newContact);
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const editContactApi = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, phone } = req.body;
        const updated = await contactService.editContact(id, name, phone);
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteContactApi = async (req, res) => {
    try {
        const { id } = req.params;
        await contactService.deleteContact(id);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getAllContactsApi,
    addContactApi,
    editContactApi,
    deleteContactApi
};