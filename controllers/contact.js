const db = require('../models');
const Contact = db.contacts;
const ObjectId = require('mongodb').ObjectId;


const createContact = async (req, res) => {
  // Validate request
  if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.favoriteColor || !req.body.birthday) {
    res.status(400).send({ message: 'All fields are required!' });
    return;
  }

  // Create a Contact
  const contact = new Contact({
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

const getContacts = (req, res) => {
  Contact.find(
    {},
    {
      firstName: 1,
      lastName: 1,
      email: 1,
      favoriteColor: 1,
      birthday: 1,
      _id: 1,
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

};

// Find a single Contact with an id
const getContact = (req, res) => {
  const contact_id = req.params.id;

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

};

// Update trhe whole  contact by the id in the request
const updateContact = async (req, res) => {
  const contact_id = new ObjectId(req.params.id);
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };


  const response = await Contact.replaceOne({ id: contact_id }, contact);
  if (response.modifiedCount > 0) {
    res.status(200).send(response);
  } else {
    res.status(500).json(response.err || { message: 'Error updating contact with id ' + contact_id });
  }
};


// Delete a Contact with the specified id in the request
const deleteContact = (req, res) => {
  const id = new ObjectId(req.params.id);

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



module.exports = {
  createContact,
  getContacts,
  getContact,
  updateContact,
  deleteContact
}


