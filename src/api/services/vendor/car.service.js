const db = require('../../../models/index');

exports.registerNewCar = async (requestParam) => {
    const carObj = requestParam;

    //vendorPhoneNo Null check 
    const { vendorRefPhoneNo } = carObj;
    if (!vendorRefPhoneNo)
        return { status: 300, message: 'Who is refering this Car. Kindly Enter that guy vendor Phone No properly.' }

    //Check vendor Phone is activated to proceed
    const vendorUserObj = await db.vendoruser.findOne({ phoneNo: vendorRefPhoneNo });

    if (!vendorUserObj)
        return { status: 300, message: `Vendor ${vendorRefPhoneNo} is not available.` }

    if (!vendorUserObj.profileStatus)
        return { status: 300, message: ` ${vendorUserObj.name}(${vendorUserObj.phoneNo}) Vendor Profile is not activated. Kindly activate it first before Mapping Car for him. ` }

    //set carFeedback default value to this car    
    let carObjWithFeedback = Object.assign(
        carObj,
        { carFeedbacks: {} }
    )

    const result = await db.cars.create(carObjWithFeedback);

    if (!result)
        throw ({ status: 300, message: 'Unable to catch DB Error' })

    return { status: 200, message: 'Car profile created successfully.' }
}

exports.getInactiveVendorCarList = async () => {
    const result = await db.cars.find({ status: false });

    if (!result)
        throw ({ status: 300, message: 'Unable to catch DB Error' })

    if (result.length == 0)
        return { status: 201, message: 'No New Car available to Activate' }

    return { status: 200, message: 'Please activate these Car.', data: result }

}


exports.activateVendorCar = async (carNo) => {
    const result = await db.cars.findOneAndUpdate({ carNo: carNo }, { status: true });

    if (!result)
        return ({ status: 300, message: `Unable to find Car ${carNo}. Please try properly. ` })

    return { status: 200, message: `CarNo: ${carNo} Status is activated.` }

}

exports.deactivateThisVendorCar = async (carNo) => {

    const result = await db.cars.findOneAndUpdate({ carNo: carNo }, { status: false });

    if (!result)
        return ({ status: 300, message: `Unable to find Car ${carNo}. Please try properly. ` })

    return { status: 200, message: `CarNo: ${carNo} Status is deactivated.. Make sure you update your management.` }

}