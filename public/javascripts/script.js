let currentContactId = null;

function showContacts() {
    const app = document.getElementById('app');
    app.innerHTML = contactsTemplate;
    loadContacts();
}

function showAddContactForm() {
    const app = document.getElementById('app');
    app.innerHTML = addContactTemplate;
}

function showEditContactForm(contact) {
    const app = document.getElementById('app');
    app.innerHTML = editContactTemplate;
    currentContactId = contact.id;
    document.querySelector('input[name="name"]').value = contact.name;
    document.querySelector('input[name="phone"]').value = contact.phone;
}

async function loadContacts() {
    const response = await fetch('/api/contacts');
    const contacts = await response.json();
    const list = document.getElementById('contacts-list');
    list.innerHTML = contacts.map(contact => `
        <tr>
            <td><a href="#" onclick='showEditContactForm(${JSON.stringify(contact)})'>${contact.name}</a></td>
            <td>${contact.phone}</td>
        </tr>
    `).join('');
}

async function addContact() {
    const name = document.querySelector('input[name="name"]').value;
    const phone = document.querySelector('input[name="phone"]').value;
    await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone })
    });
    showContacts();
}

async function submitEditContact() {
    const name = document.querySelector('input[name="name"]').value;
    const phone = document.querySelector('input[name="phone"]').value;
    await fetch(`/api/contacts/${currentContactId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone })
    });
    showContacts();
}

async function deleteCurrentContact() {
    if (!confirm('Вы уверены?')) return;
    await fetch(`/api/contacts/${currentContactId}`, { method: 'DELETE' });
    showContacts();
}

document.addEventListener('DOMContentLoaded', showContacts);