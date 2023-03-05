const db = require('../../../models/index');

exports.createNewVendor = async ({ phoneNo, name }) => {
    try{
            console.log("====" +phoneNo);
            await checkIsVendorAlreadyExists({phoneNo, name});
            // console.log("===" +phoneNo+ "-----" +name);
            const result = await db.newvendor.create({
                phoneNo: phoneNo,
                name: name
            });
    
        console.log("=======> "+phoneNo+ " " +result);
    
        if (!result)
            throw ({ status: 501, message: 'Internal Server Error' })
    
            return { status: 201, message: 'New Vendor created successfully', data: result }
            
        }  catch(e){
                return { status: 300, error: e, message: "Somebody error" }
        }
    }

const checkIsVendorAlreadyExists = async (phoneNo) => {
    //Check vendor already exist in newvendor DB by phoneNo
    const isAlreadyExist = await db.newvendor.exists({ phoneNo: phoneNo, name: name })
    // const isAlreadyExist = await db.newvendor.find({ $phoneNo: { $exists: true }})
    console.log(isAlreadyExist);
    
    if (isAlreadyExist)
        return ({ status: 300, message: `User already exits for : ${phoneNo}`, data: isAlreadyExist });
}

exports.getInactiveVendorList = async () => {
    const result = await db.newvendor.find({ profileStatus: false });

    try {
       
        if (!result)
            throw ({ status: 300, message: 'Unable to catch DB Error' })

        if (result.length == 0)
            return { status: 201, message: 'No New Vendor Profile available' }

        return { status: 200, message: 'Please activate these vendor profiles ASAP.', data: result }
  
    } catch(error) {
        return { status: 300, message: error}
    }
}

exports.activeNewVendor = async (vendorPhoneNo) => {

    const result = await db.newvendor.findOneAndUpdate({ phoneNo: vendorPhoneNo }, { profileStatus: true });

    if (!result)
        return ({ status: 300, message: `Unable to find Vendor ${vendorPhoneNo}. Please try properly. ` })

    return { status: 200, message: `Vendor Profile ${vendorPhoneNo} is activated.` }

}

exports.getVendorDetail = async (phoneNo) => {

    const result = await db.newvendor.findOne({ phoneNo: phoneNo });
    
    try { 
            if (!result)
                throw ({ status: 300, message: `Unable to find vendor ${phoneNo}` })

            return { status: 200, message: 'Vendor Details available', data: result }
        } catch(error) {
            return { status: 300, message: error } 
        }
}


exports.deactivateThisVendor = async (vendorPhoneNo) => {

    const result = await db.newvendor.findOneAndUpdate({ phoneNo: vendorPhoneNo }, { profileStatus: false });

    if (!result)
        return ({ status: 300, message: `Unable to find Vendor ${vendorPhoneNo}. Please try properly. ` })

    return { status: 200, message: `Vendor Profile ${vendorPhoneNo} is deactivate. Make sure you update your management.` }

}