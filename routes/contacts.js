const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/contacts');

router.get('/', contactsController.getContacts);

router.get('/contacts', contactsController.getContacts);

router.get('/:id', contactsController.getContact);

module.exports = router;