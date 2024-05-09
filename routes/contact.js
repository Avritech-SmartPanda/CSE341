const routes = require('express').Router();
const contacts = require('./../controllers/contact');
const app = require('express')();
const bodyParser = require('body-parser');


routes.get('/', contacts.getContacts);
routes.post('/', contacts.createContact);
routes.get('/:id', contacts.getContact);
routes.put('/:id', contacts.updateContact);
routes.delete('/:id', contacts.deleteContact);

app.use(bodyParser.json());
module.exports = routes;
