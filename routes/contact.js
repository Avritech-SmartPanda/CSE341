const routes = require('express').Router();
const contacts = require('./../controllers/contact');


routes.get('/', contacts.getContacts);
routes.post('/', contacts.createContact);
routes.get('/:contact_id', contacts.getContact);
routes.put('/:contact_id', contacts.updateContact);
routes.delete('/:contact_id', contacts.deleteContact);
routes.delete('/', contacts.deleteContacts);
module.exports = routes;
