const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getContacts = async (req, res) => {
    const result = await mongodb.getDb().db('project1').collection('contacts').find();
    result.toArray().then((list) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(list);
    });
}

const getContact = async (req, res) => {
    const contactId = req.params.id;
    const result = await mongodb.getDb().db('project1').collection('contacts').find({ _id: contactId });
    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts[0]);
    });


}

module.exports = {
    getContacts,
    getContact
}
