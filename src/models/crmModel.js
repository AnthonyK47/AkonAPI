import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const ContactSchema = new Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String
    },
    username: {
        type: String
    },
    employeeNumber: {
        type: String
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});