const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const address = new Schema({
    name: { type: String },
    loc: { type: { type: String, default: "Point" }, coordinates: [Number] },
    address: { type: String, required: true },
    address2: { type: String },
    pincode: { type: Number },
    isPrimary: { type: Boolean },
    district: { type: String, required: true },
})


const custUserModel = mongoose.model('custuser', new Schema({
    phoneNo: { type: Number, required: true, minLength: 7, maxLength: 12, unique: true },
    status: { type: Boolean },
    username: { type: String },
    emailId: { type: String },
    name: { type: String },
    fcmToken: { type: String },
    emergencyContacts: [],
    createdOn: { type: Date, default: Date.now },
    locations: [address]
}));

custUserModel.createIndexes({ phoneNo: 1, unique: true });

module.exports = custUserModel;

