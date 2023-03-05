const db = require('../../../models/index');
const { currentDate, addMonth } = require('../../helpers/utils');


exports.createNewWallet = async (walletObj) => {

    //vendorPhoneNo Null check 
    const { vendorPhoneNo, walletAmt } = walletObj;

    if (!vendorPhoneNo)
        return { status: 300, message: 'Vendor Phone No is mandatory to proceed.' }

    //Check vendor Phone is activated to proceed
    const vendorUserObj = await db.vendoruser.findOne({ phoneNo: vendorPhoneNo });
    if (!vendorUserObj)
        return { status: 300, message: `Vendor ${vendorPhoneNo} is not available.` }

    if (!vendorUserObj.profileStatus)
        return { status: 300, message: ` ${vendorUserObj.name}(${vendorUserObj.phoneNo}) Vendor Profile is not activated. Kindly activate it first before Mapping Car for him. ` }

    //To create New Wallet SchmeType should be alway 2(Cost for each trip) while creating New Customer
    walletObj['schemeType'] = 2;
    walletObj['monthlyStartDate'] = currentDate();
    walletObj['monthlyEndDate'] = currentDate();

    // Create New Vendor Wallet    
    const result = await db.wallets.create(walletObj);

    await InsertIntoPayments(vendorPhoneNo, 'ON_LAUNCH_OFFER', walletAmt, 'COMPLETED');

    if (!result)
        throw ({ status: 300, message: 'Unable to catch DB Error' })

    return { status: 200, message: `Wallet account created successfully.` }

}

exports.recharge = async ({ vendorPhoneNo, schemeType, paymentVia, amount, paymentStatus }) => {

    //Check is Wallet account is already created or not
    const walletAccount = await db.wallets.findOne({ vendorPhoneNo: vendorPhoneNo })
    if (!walletAccount)
        return ({ status: 300, message: `Wallet Account for ${vendorPhoneNo} is not available.` })

    if (!schemeType)
        return ({ status: 300, message: `SchemeType is Mandatory.Pass 1 for Monthly Scheme and 2 for Cost for Each trip scheme.` })

    //Inserting into Payment history table for reference.
    await InsertIntoPayments(vendorPhoneNo, paymentVia, amount, paymentStatus);

    if (schemeType == 1)
        return await MonthlySchemeRecharge(vendorPhoneNo, walletAccount, amount) // Customer Opting for Monthly Scheme

    if (schemeType == 2)
        return await CostForEachTripRecharge(vendorPhoneNo, walletAccount, amount); // Customer opting for Cost for each trip
}

const MonthlySchemeRecharge = async (vendorPhoneNo, walletAccount, amount) => {
    const start_date = currentDate();
    const end_date = addMonth(walletAccount.monthlyEndDate, 1);
    const walletObj = {
        status: true,
        monthlyStartDate: start_date,
        monthlyEndDate: end_date,
        vendorPhoneNo: vendorPhoneNo,
        schemeType: 1,                  // Monthly Scheme
    }

    const result = await db.wallets.findOneAndUpdate(
        { vendorPhoneNo: vendorPhoneNo },
        walletObj,
        { upsert: false }
    )

    if (!result)
        return ({ status: 300, message: `Unable to find Vendor ${vendorPhoneNo} in Wallet table. Please try properly. ` })

    return { status: 200, message: `Wallet amount updated in Monthly Scheme.` }

}

const CostForEachTripRecharge = async (vendorPhoneNo, walletAccount, amount) => {
    const _Updated_Wallet_Amt = walletAccount.walletAmt + amount;

    const walletObj = {
        status: true,
        vendorPhoneNo: vendorPhoneNo,
        schemeType: 2,                  // CostForEachTrip Scheme
        walletAmt: _Updated_Wallet_Amt
    }

    const result = await db.wallets.findOneAndUpdate(
        { vendorPhoneNo: vendorPhoneNo },
        walletObj,
        { upsert: false }
    )

    if (!result)
        return ({ status: 300, message: `Unable to find Vendor ${vendorPhoneNo} in Wallet table. Please try properly. ` })

    return { status: 200, message: `Wallet amount updated in CostForEachTrip scheme. Existing Amount: ${walletAccount.walletAmt} + Added Amount ${amount} = Current Wallet Amount: ${_Updated_Wallet_Amt}` }

}


const InsertIntoPayments = async (vendorPhoneNo, paymentVia, amount, paymentStatus) => {
    const paymentsResult = await db.payments.create({
        vendorPhoneNo: vendorPhoneNo,
        paymentVia: paymentVia,
        amount: amount,
        Date: currentDate(),
        status: paymentStatus
    })

    if (!paymentsResult)
        throw ({ status: 300, message: `Unable to find Vendor ${vendorPhoneNo} in Payment History table. Please try properly. ` })

}

exports.getWalletDetail = async (phoneNo) => {
    const result = await db.wallets.findOne({ vendorPhoneNo: phoneNo });
    if (!result)
        throw ({ status: 300, message: 'Unable to catch DB Error' })

    return { status: 200, message: `Wallet Detail`, data: result }

}

exports.getPaymentsDetails = async (phoneNo, limit) => {
    const result = await db.payments.find({ vendorPhoneNo: phoneNo }).sort({ _id: -1 }).limit(limit);
    if (!result)
        throw ({ status: 300, message: 'Unable to catch DB Error' })
    if (result.length == 0)
        return { status: 300, message: `No Payment history found for Vendor ${phoneNo}` }

    return { status: 200, message: `Last  ${limit} payments history of vendor ${phoneNo}`, data: result }

}