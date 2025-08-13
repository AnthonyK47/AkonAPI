import mongoose from 'mongoose';
import { ContactSchema } from '../models/crmModel';
import KPAService from '../services/kpaService.js';

const Contact = mongoose.model('Contact', ContactSchema);

const kpaService = new KPAService(process.env.KPA_TOKEN || 'YOUR_TOKEN_HERE');


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

export const updateContact = async (req, res) => {
    try {
        const contacts = await Contact.findOneAndUpdate({ _id: req.params.contactId }, req.body, { new: true });
        res.json(contacts);
    } catch (err) {
        res.send(err)
    }
    
};

export const deleteContact = async (req, res) => {
    try {
        const contacts = await Contact.findByIdAndDelete(req.params.contactId);
        res.json({ message: 'Successfully deleted contact' });
    } catch (err) {
        res.send(err)
    }
};

// Get KPA User info from Flex
export const getKPAUserInfo = async (req, res) => {
    try {
        const { userId } = req.params;
        const userInfo = await kpaService.getUserInfo;
        res/json(userInfo);
    } catch (err) {
        console.error('Error fetching KPA user info:', err.message);
        res.status(500).json({
            error: 'Failed to fetch user info from KPA',
            details: err.message
        });
    }
};

export const syncKPAUserToContact = async (req, rest) => {
    try {
        const { userID } = req.params;

        // get user data from Flex
        const kpaResponse = await kpaService.getUserInfo(userId);
        const kpaUser = kpaResponse.user;

        const contactData = {
            firstName: kpaUser.firstname,
            lastName: kpaUser.lastname,
            email: kpaUser.email,
            username: kpaUser.username,
            employeeNumber: kpaUser.employeeNumber
        };

        // Check if contact already exists by employeeNumber
        const existingContact = await Contact.findOne({ employeeNumber: kpaUser.employeeNumber });
        
        let contact;
        if (existingContact) {
            // Update existing contact (match by email or whatever field you choose)
            contact = await Contact.findOneAndUpdate(
                { email: kpaUser.email }, // or whatever matching field you use
                contactData, 
                { new: true }
            );
        } else {
            // Create new contact
            contact = new Contact(contactData);
            await contact.save();
        }
        
        res.json({
            message: 'Successfully synced KPA user to contact',
            contact: contact,
            kpaUser: kpaUser
        });
        
    } catch (err) {
        console.error('Error syncing KPA user:', err.message);
        res.status(500).json({ 
            error: 'Failed to sync KPA user', 
            details: err.message 
        });
    }
};