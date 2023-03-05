const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const { database } = require('../config/configs')

const mongoose = require('mongoose');

//Check MongoDb Connection check
(async () => {
    return await mongoose.connect(
        database.mongoConnectUri,
        { useNewUrlParser: true },
        () => {
            console.log('Mongoose DB Connected');
        });
})();


var db = {};

fs
    .readdirSync(__dirname)
    .filter(file => (file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'))
    .forEach(async file => {
        const fileName = file.slice(0, -3);
        db[fileName] = require(path.join(__dirname, file));
    });

module.exports = db

