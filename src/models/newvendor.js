const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newVendorUser = mongoose.model('newvendor', new Schema({
    phoneNo: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    profileStatus: { type: Boolean, default: false },
    updatedOn: { type: Date, default: Date.now }
}));

newVendorUser.createIndexes({ profileStatus: 1, phoneNo: 1 });

module.exports = newVendorUser;

// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const vendorUserModel = mongoose.model('vendoruser', new Schema({
//     phoneNo: { type: Number, required: true, unique: true },
//     name: { type: String, required: true },
//     address: { type: String },
//     profileStatus: { type: Boolean, default: false },
//     age: { type: Number },
//     exp: { type: Number },
//     aboutUs: { type: String, default: 'Passionate of driving.' },
//     languagesKnown: { type: [String] },
//     optedFor: { type: Number, enum: [1, 2, 3] },
//     updatedOn: { type: Date, default: Date.now }
// }));

// vendorUserModel.createIndexes({ profileStatus: 1, phoneNo: 1 });

// module.exports = vendorUserModel;
