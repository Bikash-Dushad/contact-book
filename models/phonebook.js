const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const phonebook = new Schema({
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    pnumber: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    dob: { type: String, required: true },
    fileLocation: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
    },
{
    timestamps: true
});

const Phonebook = mongoose.model('Phonebook', phonebook);

module.exports = Phonebook;