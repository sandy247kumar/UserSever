const express = require('express');
const router = express.Router();
const controller = require('../../controllers/customer/user.controller');

router.route('/testAPI').post(controller.testAPI);

/**
 * @route /api/cust/user/newuser
 * @method POST
 * @req { phoneNo* }
 * @statusCode [
        200 - New User created successfully
        300 - User already exits for : PhoneNo
    ]
    @ImpactedModules : 
        1. Cust_User
    @ChannelUsed :
        1. Customer Mobile App
        2. Admin Module 
 */
router.route('/newuser').post(controller.newUser);


/**
 * @route /api/cust/user/user
 * @method PUT
 * @req { phoneNo*, Other Params }
 * @statusCode [
        200 - Information Updated Successfully.User PhoneNo: PhoneNo 
        300 - User not available to update
    ]
    @description: On launch of customer mobile app to get user details and active booking status
 */
router.route('/user').put(controller.updateUser);


/**
 * @route /api/cust/user/user
 * @method GET
 * @req { phoneNo }
 * @statusCode [
        200 - Success
        404 - User not found
        401 - Incorrect credentials
    ]
    @description: return user object if available
 */
    router.route('/user/:phoneNo?').get(controller.getUserDetail);



module.exports = router;