const Contact = require('../models/contact');

const contactService = new Contact();

const getAllContacts = async (req, res) => {
    try {
        const contacts = await contactService.getAllContacts();
        res.render('contacts', {
            contacts: contacts
        });
    } catch (err) {
        console.log(err);
    }
};


const getContact = async (req, res) => {
    try {
        if (req.query.id) {
            const contact = await contactService.getContact(req.query.id);
            res.json(contact);
        } else {
            res.end('Parameter not found');
        }
    } catch (err) {
        console.log(err);
    }
};
const addContactForm = async (req, res) => {
    let contacts = await contactService.getAllContacts();
    res.render('addContact', {
        contacts: contacts
    });
};

const addContact = async (req, res) => {
    if (req.body.name && req.body.phone) {
        await contactService.addContact(req.body)
            .then(result => res.json(result))
            .catch(err => console.error(err.message));
    } else {
        res.end('Parameters not found');
    }
};

const editContactForm = async (req, res) => {
    let contacts = await contactService.getAllContacts();
    let contact = await contactService.getContact(req.params["id"]);
    res.render('editContact', {
        contacts: contacts,
        thisContact: contact
    });
};

const editContact = async (req, res) => {
    if (req.params["id"] && req.body.name && req.body.phone) {
        await contactService.editContact(req.params["id"], req.body)
            .then(result => res.json(result))
            .catch(err => console.error(err.message));
    } else {
        res.end('Parameters not found');
    }
};

const deleteContact = async (req, res) => {
    if (req.params["id"]) {
        await contactService.deleteContact(req.params["id"])
            .then(result => res.json(result))
            .catch(err => console.error(err.message));
    } else {
        res.end('Parameters not found');
    }
}

const getAllContactsApi = async (req, res) => {
    try {
        const contacts = await contactService.getAllContacts();
        res.json(contacts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const addContactApi = async (req, res) => {
    try {
        const { name, phone } = req.body;
        const newContact = await contactService.addContact(name, phone);
        res.status(201).json(newContact);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const editContactApi = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, phone } = req.body;
        const updatedContact = await contactService.editContact(id, name, phone);
        res.json(updatedContact);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteContactApi = async (req, res) => {
    try {
        const { id } = req.params;
        await contactService.deleteContact(id);
        res.status(204).send();
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getAllContacts = getAllContacts;
exports.getContact = getContact;
exports.addContactForm = addContactForm;
exports.addContact = addContact;
exports.editContactForm = editContactForm;
exports.editContact = editContact;
exports.deleteContact = deleteContact;

module.exports = {
    getAllContactsApi,
    addContactApi,
    editContactApi,
    deleteContactApi
};