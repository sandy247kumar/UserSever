const express = require('express');
const router = express.Router();

const controller = require('../../controllers/vendor/vendor.controller');

/**
 * @route /api/vendor/user/newvendor
 * @method POST
 * @req { name*,phoneNo*}
 * @statusCode [
        200 - Success
        300 - User not found
    ]
    @description: Create New Vendor user Account 
 */
router.route('/newvendor').post(controller.newVendor);

/**
 * @route /api/vendor/user/inactivelist
 * @method GET
 * @req {}
 * @statusCode [
        200 - Success
        300 - User not found
    ]
    @description: Return all Profile_Status:false Vendor account in list of Array Obj
 */
    router.route('/inactivelist').get(controller.inactiveList);
    

/**
 * @route /api/vendor/user/updatevendor
 * @method PUT
 * @req {}
 * @statusCode [
        200 - Success
        300 - User not found
    ]
    @description:  Profile_Status:True through by phono number, Vendor account in list of Array Obj
 */
    router.route('/updatevendor').put(controller.activateVendor);

/**
 * @route /api/vendor/user/details
 * @method GET
 * @req { phoneNo*, Other Params }

 * @statusCode [
        200 - Information Updated Successfully.User PhoneNo: PhoneNo 
        300 - User not available to update
    ]
    @description: On launch of customer mobile app to get user details and active booking status
 */
// router.route('/details').get(controller.vendorDetails);
router.route('/details/:phoneNo?').get(controller.vendorDetails);


/**
 * @route /api/user/vendors/deactivate
 * @method PUT
 * @req {}
 * @statusCode [
        200 - Success
        300 - User not found
    ]
    @description: Return all Profile_Status:false Vendor account in list of Array Obj
 */
    router.route('/deactivate').put(controller.deactivateVendor);


module.exports = router;