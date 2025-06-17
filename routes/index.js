const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

router.get('/', (req, res) => {
    res.render('contacts');
});

router.get('/api/contacts', contactController.getAllContactsApi);
router.post('/api/contacts', contactController.addContactApi);
router.put('/api/contacts/:id', contactController.editContactApi);
router.delete('/api/contacts/:id', contactController.deleteContactApi);

module.exports = router;