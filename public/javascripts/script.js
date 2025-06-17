const contactsTemplate = `
    <div class="container mt-4">
        <button onclick="showAddContactForm()" class="btn btn-primary">Добавить</button>
        <table class="table table-striped">
            <thead>
            <tr>
                <th scope="col">ФИО</th>
                <th scope="col">Телефон</th>
            </tr>
            </thead>
            <tbody id="contacts-list"></tbody>
        </table>
    </div>
`;

const addContactTemplate = `
    <div class="container mt-4">
        <h1 class="text-center">Добавить контакт</h1>
        <form class="form w-25 mx-auto">
            <div class="form-group">
                <label for="name" class="form-label">ФИО</label>
                <input class="form-control" type="text" required name="name" id="name">
            </div>
            <div class="form-group">
                <label for="phone" class="form-label">Телефон</label>
                <input class="form-control" type="tel" required name="phone" id="phone">
            </div>
        </form>
        <div class="container w-25 mt-4 d-flex flex-row justify-content-between">
            <button class="btn btn-primary" onclick="addContact()">Добавить</button>
            <button class="btn btn-primary" onclick="showContacts()">Назад</button>
        </div>
    </div>
`;

const editContactTemplate = `
    <div class="container mt-4">
        <h1 class="text-center">Редактировать контакт</h1>
        <form class="form w-25 mx-auto">
            <div class="form-group">
                <label for="name" class="form-label">ФИО</label>
                <input class="form-control" type="text" required name="name" id="name">
            </div>
            <div class="form-group">
                <label for="phone" class="form-label">Телефон</label>
                <input class="form-control" type="tel" required name="phone" id="phone">
            </div>
        </form>
        <div class="container w-25 mt-4 d-flex flex-row justify-content-between">
            <button class="btn btn-primary" onclick="submitEditContact()">Сохранить</button>
            <button class="btn btn-danger" onclick="deleteCurrentContact()">Удалить</button>
            <button class="btn btn-secondary" onclick="showContacts()">Назад</button>
        </div>
    </div>
`;

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
    try {
        const response = await fetch('/api/contacts');
        const contacts = await response.json();
        const contactsList = document.getElementById('contacts-list');
        
        contactsList.innerHTML = contacts.map(contact => `
            <tr>
                <td><a href="javascript:void(0)" class="text-decoration-none" onclick='showEditContactForm(${JSON.stringify(contact)})'>${contact.name}</a></td>
                <td>${contact.phone}</td>
            </tr>
        `).join('');
    } catch (e) {
        console.error('Error loading contacts:', e);
    }
}

async function addContact() {
    const name = document.querySelector('input[name="name"]').value;
    const phone = document.querySelector('input[name="phone"]').value;

    try {
        const response = await fetch('/api/contacts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, phone })
        });
        
        if (response.ok) {
            showContacts();
        }
    } catch (e) {
        console.error('Error adding contact:', e);
    }
}

async function submitEditContact() {
    const name = document.querySelector('input[name="name"]').value;
    const phone = document.querySelector('input[name="phone"]').value;

    try {
        const response = await fetch(`/api/contacts/${currentContactId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, phone })
        });
        
        if (response.ok) {
            showContacts();
        }
    } catch (e) {
        console.error('Error updating contact:', e);
    }
}

async function deleteCurrentContact() {
    if (!confirm('Вы уверены, что хотите удалить этот контакт?')) {
        return;
    }

    try {
        const response = await fetch(`/api/contacts/${currentContactId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });
        
        if (response.ok) {
            showContacts();
        }
    } catch (e) {
        console.error('Error deleting contact:', e);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    showContacts();
});