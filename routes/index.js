const routes = require('express').Router();
const contact = require('./contact');

routes.use('/contacts', contact);
routes.use(
  '/',
  (docData = (req, res) => {
    let docData = {
      documentationURL: 'https://github.com',
    };
    res.send(docData);
  })
);

module.exports = routes;
