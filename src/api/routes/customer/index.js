const express = require('express');
const router = express.Router();

/**
 * @route /api/cust/user
 */

 router.use('/user', require('./user.route'));
 router.use('/rides', require('./rides.route'));

// const custUserRoute = require('./user.route');
// const ridesRoute = require('./rides.route');

// router.use('/user', custUserRoute);
// router.use('/rides', ridesRoute);


module.exports = router;