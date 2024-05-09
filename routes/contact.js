const routes = require('express').Router();
const contacts = require('./../controllers/contact');



routes.get('/', contacts.findAll);
routes.get('/:contact_id', contacts.findOne);
routes.post('/', contacts.create);
routes.put('/:contact_id', contacts.update);
routes.delete('/:contact_id', contacts.delete);
routes.delete('/', contacts.deleteAll);
module.exports = routes;
