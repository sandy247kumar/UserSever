const vWalletService = require('../../services/vendor/wallet.service');

exports.createNewWallet = async (req, res) => {
    try {
        const result = await vWalletService.createNewWallet(req.body);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(300).json({ status: 300, message: error });
    }
}

exports.recharge = async (req, res) => {
    const { vendorPhoneNo, schemeType, amount, paymentVia, paymentStatus } = req.body;

    try {
        const result = await vWalletService.recharge({ vendorPhoneNo, schemeType, amount, paymentVia, paymentStatus });
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(300).json({ status: 300, message: error });
    }
}

exports.getWalletDetail = async (req, res) => {
    const phoneNo = req.params.phoneNo;
    try {
        const result = await vWalletService.getWalletDetail(phoneNo);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(300).json({ status: 300, message: error });
    }
}

exports.getPaymentsDetails = async (req, res) => {
    const phoneNo = req.params.phoneNo;
    const limit = req.params?.limit || 10;
    try {
        const result = await vWalletService.getPaymentsDetails(phoneNo, limit);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(300).json({ status: 300, message: error });
    }
}

/**
 * @description  Used By Booking API on Finalizing Booking
 */
exports.WalletDeductAmt = async (req, res) => {
    console.log(req.body)
    return res.json({ status: 200, data: 'Success' })
}