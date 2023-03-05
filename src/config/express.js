const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const error = require('../utils/error');

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

//Enable API route
app.use('/api', require('../api/routes'));

// Error handler, send stacktrace only during development
// app.use(error.handler);

module.exports = app;
