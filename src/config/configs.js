require('dotenv').config();

const environment = process.env.ENVIRONMENT || 'development';

const database = {
    mongoConnectUri: process.env.mongodbUri,
}

module.exports = {
    environment,
    database,
    port: process.env.Port || 3000
}