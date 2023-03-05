const db = require('../../../models/index');


/**
 * 
 * @param {*} phoneNo 
 * @returns {200, 300}
 */
exports.
createNewUser = async ({ phoneNo } ) => {

    await checkIsUserAlreadyExists(phoneNo);

    try {
   
        const result = await db.custuser.create({ phoneNo: phoneNo });

    if (!result)
        throw ({ status: 500, message: 'Internal Server error' })

        return { status: 201, message: 'New User created successfully' }
    } catch (e) {
        return { status: 300, message: 'Multiple Choices' +e}
    }
}

const checkIsUserAlreadyExists = async (phoneNo) => {
    //Check user already exist in UserDB by phoneNo
    const isAlreadyExist = await db.custuser.exists({ phoneNo: phoneNo })
    if (isAlreadyExist)
        throw ({ status: 403, message: `User already exits for : ${phoneNo} ` });

}


/**
 * @param {*} phoneNo 
 * @returns {200, 300}
 * @todo : Impliment Aggregation here, Optimization required
 * Issues: 1. location update is not working on 2nd time      
 */
exports.updateUserObj = async (requestObj) => {
 
 try {
        const { locations, username, emailId, phoneNo } = requestObj;
        const userModel = await db.custuser.findOne({ phoneNo: phoneNo })

        if (userModel == null)
            throw ({ status: 404, message: 'User not available to update' });

        const userdb = {};
        Object.assign(userdb,
            {
                ...emailId && { emailId },
                ...username && { "username": username },
                ...locations && { "locations": locations }
            });

        const userUpdateStatus = await db.custuser.updateOne(
            { phoneNo: phoneNo },
            { '$set': userdb }
        );

        if (!userUpdateStatus)
            throw ({ status: 412, message: 'There is some technical issue. Please try after some time.' })

        return { status: 201, message: `Information Updated Successfully. User PhoneNo: ${phoneNo} `, data: userUpdateStatus }
    } catch (error) {
        return { status: 300, message: error}
    }
}

exports.getUserDetail = async (phoneNo) => {

    const result = await db.custuser.findOne({ phoneNo: phoneNo });
    
    try { 
            if (!result)
                throw ({ status: 300, message: `Unable to find user ${phoneNo}` })

            return { status: 200, message: 'User Details available', data: result }
        } catch(error) {
            return { status: 300, message: error } 
        }
}
