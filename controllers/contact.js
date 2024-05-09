const db = require('../models');
const Contact = db.contacts;

const apiKey =
  'Ezl0961tEpx2UxTZ5v2uKFK91qdNAr5npRlMT1zLcE3Mg68Xwaj3N8Dyp1R8IvFenrVwHRllOUxF0Og00l0m9NcaYMtH6Bpgdv7N';

exports.create = (req, res) => {
  // Validate request
  if (!req.body.name || !req.body.contact_id || !req.body.firstName || !req.body.lastName || !req.body.email || !req.body.favoriteColor || !req.body.birthday) {
    res.status(400).send({ message: 'All fields are required!' });
    return;
  }

  // Create a Contact
  const contact = new Contact({
    contact_id: req.body.contact_id,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  });
  contact
    .save(contact)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the Contact.',
      });
    });
};

exports.findAll = (req, res) => {
  if (req.header('apiKey') === apiKey) {
    Contact.find(
      {},
      {
        contact_id: 1,
        firstName: 1,
        lastName: 1,
        email: 1,
        favoriteColor: 1,
        birthday: 1,
        _id: 0,
      }
    )
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || 'Some error occurred while retrieving contacts.',
        });
      });
  } else {
    res.send('Invalid apiKey, please read the documentation.');
  }
};

// Find a single Contact with an id
exports.findOne = (req, res) => {
  const contact_id = req.params.contact_id;
  if (req.header('apiKey') === apiKey) {
    Contact.find({ contact_id: contact_id })
      .then((data) => {
        if (!data)
          res
            .status(404)
            .send({ message: 'Not found Contact with contact_id ' + contact_id });
        else res.send(data[0]);
      })
      .catch((err) => {
        res.status(500).send({
          message: 'Error retrieving Contact with contact_id=' + contact_id,
        });
      });
  } else {
    res.send('Invalid apiKey, please read the documentation.');
  }
};

// Update a Contact by the id in the request
exports.update = (req, res) => {
  const contact_id = req.params.contact_id;

  Contact.findOneAndUpdate({ contact_id: contact_id }, req.body, {
    useFindAndModify: false,
  })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Contact with contact_id=${contact_id}. Maybe Contact was not found!`,
        });
      } else res.status(200).send({ message: 'Contact was updated successfully.' });
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Contact with contact_id=' + contact_id,
      });
    });
};
 

// Delete a Contact with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Contact.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Contact with id=${id}. Maybe Contact was not found!`,
        });
      } else {
        res.status(200).send({
          message: 'Contact was deleted successfully!',
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Contact with id=' + id,
      });
    });
};

// Delete all contacts from the database.
exports.deleteAll = (req, res) => {
  Contact.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} contacts were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while removing all contact.',
      });
    });
};

 

 