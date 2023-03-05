const apierror = require('../../helpers/api-error');
const userService = require('../../services/customer/user.service');


exports.testAPI = async (req, res) => {
    console.log(req)

    return res.json({ status: 200, message: 'Success ' })
}


/**
 * 
 * @param {*} { phoneNo }
 * @returns 
 */
// 1 => Enter 1st time user put the PhoneNo to SignUP
exports.newUser = async (req, res) => {
    const {phoneNo} = req.body;
    console.log(">>>>> " +phoneNo)
    try {
        const result = await userService.createNewUser({phoneNo});
        res.status(200).json(result)
        console.log(JSON.stringify(result));
    } catch (error) {
        // console.error(error);
        res.status(300).json(error);
    }
}

/**
 * @param {}
 * 
 */
exports.updateUser = async (req, res, next) => {

    try {
        const result = await userService.updateUserObj(req.body);
        res.status(200).json(result);
        console.log(JSON.stringify(result));
    } catch (error) {
        console.error(error);
        res.status(300).json(error);
    }
}


/**
 * 
 * @param {*} req: PhoneNo 
 * @param {*} res 
 * @param {*} next 
 */
 exports.getUserDetail = async (req, res) => {

    const phoneNo = req.params?.phoneNo;
    console.log("--------" +phoneNo);

    if (!phoneNo)
        return res.status(300).json({ status: 300, message: 'User Phone Number is Mandatory' })
        

    try {
        const result = await userService.getUserDetail(phoneNo);
        res.json(result)
        console.log(JSON.stringify(result));
    } catch (error) {
        console.error(error);
        res.status(300).json(error);
    }
}