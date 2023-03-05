const express = require('express');
const router = express.Router();
const controller = require('../../controllers/customer/rides.controller');

/**
 * @route /api/cust/rides/
 */
router.route('/').post(controller.saveNewRide);

// router.route('/').get(controller.getRidesByuser);

module.exports = router;