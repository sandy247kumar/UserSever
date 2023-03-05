const express = require('express');
const router = express.Router();

const controller = require('../../controllers/vendor/wallet.controller');


/**
 * @route /api/vendor/wallet/CreateNewWallet
 * @method POST
 * @req { name*,phoneNo*, }
 * @statusCode [
        200 - Success
        300 - User not found
    ]
    @description: Create New Vendor Wallet Account using his/her vendor PhoneNo  
 */
router.route('/wallet').post(controller.createNewWallet);



/**
 * @route /api/vendor/wallet/Recharge
 * @method PUT
 * @req { name*,phoneNo*, SchemeType* }
 * @statusCode [
        200 - Success
        300 - User not found
    ]
    @description:  
 */
router.route('/Recharge').put(controller.recharge);


/**
 * @route /api/vendor/wallet/wallet
 * @method GET
 * @req { phoneNo* }
 * @statusCode [
        200 - Success
        300 - User not found
    ]
    @description:  
 */
router.route('/wallet/:phoneNo').get(controller.getWalletDetail);


/**
 * @route /api/vendor/payments/:phoneNo/:limit?
 * @method GET
 * @req { phoneNo*, limit? - Optional: default 10 if no limit value}
 * @statusCode [
        200 - Success
        300 - User not found
    ]
    @description:  
 */
router.route('/payments/:phoneNo/:limit?').get(controller.getPaymentsDetails);



/**
 * @route /api/vendor/payments/:phoneNo/:limit?
 * @method GET
 * @req { phoneNo*, limit? - Optional: default 10 if no limit value}
 * @statusCode [
        200 - Success
        300 - User not found
    ]
    @description:  
 */
router.route('/WalletDeductAmt').post(controller.WalletDeductAmt);


module.exports = router;