const express = require('express');
const router = express.Router();

const controller = require('../../controllers/vendor/car.controller');

/**
 * @route /api/vendor/car/newCar
 * @method POST
 * @req { }
 * @statusCode [
        200 - Success
        300 - User not found
    ]
    @description: Register new car for vendor
 */
router.route('/newCar').post(controller.newCarRegistration);

/**
 * @route /api/vendor/car/CarInactivelist
 * @method GET
 * @req {}
 * @statusCode [
        200 - Success
        300 - User not found
    ]
    @description: Return all car status:false car details in list of Array Obj
 */

router.route('/CarInactivelist').get(controller.inactiveCarList);

/**
 * @route /api/vendor/user/activate
 * @method PUT
 * @req {}
 * @statusCode [
        200 - Success
        300 - User not found
    ]
    @description: Return all Profile_Status:false Vendor account in list of Array Obj
 */
router.route('/activate/:carNo').put(controller.activateVendorCar);


/**
 * @route /api/vendor/car/deactivate
 * @method PUT
 * @req {}
 * @statusCode [
        200 - Success
        300 - User not found
    ]
    @description: Return all Profile_Status:false Vendor account in list of Array Obj
 */
    router.route('/deactivate/:carNo').put(controller.deactivateVendorCar);


module.exports = router;