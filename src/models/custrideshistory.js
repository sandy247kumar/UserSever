const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('custrideshistory', new Schema({
    bookingId: { type: String, required: true, unique: true },
    userId: { type: String, required: true },
    fromAddress: String,
    toAddress: String,
    date: String,
    price: String,
    vendorId: String
}));