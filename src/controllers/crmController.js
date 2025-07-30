import mongoose from 'mongoose';
import { ContactSchema } from '../models/crmModel';

const Contact = mongoose.model('Contact', ContactSchema);

export const addNewContact = async (req, res) => {
    try {
        let newContact = new Contact(req.body);
        const contact = await newContact.save();
        res.json(contact);
    } catch (err) {
        res.send(err);
    }
};

export const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.json(contacts);
    } catch (err) {
        res.send(err)
    }
};

export const getContactWithID = async (req, res) => {
    try {
        const contacts = await Contact.findById(req.params.contactId);
        res.json(contacts);
    } catch (err) {
        res.send(err)
    }
};