const vUserService = require('../../services/vendor/vendor.service');

// 1 => Login / SignUp for New Vendor -> Mandatory for *Phone No, *Name 
exports.newVendor = async (req, res) => {
    const { phoneNo, name } = req.body;
    
    if (!phoneNo && !name )    // 300 -> Multiple content ,204 -> No content
        return res.status(300).json({ status: 204, message: 'Vendor Phone Number and Name is Mandatory' })

    console.log(phoneNo + " " + name);

    try {
        const result = await vUserService.createNewVendor({ phoneNo, name });
        // console.log(phoneNo);
        res.status(200).json(result)
    } catch (error) {
        // console.error(error);
        res.status(300).json({ error: error, message: "Enter the Correct Details "});
    }
}

// 2 => Vendor was successfully entered then, How many Inactive{ profileStatus: false } vendors to be activate(List)   
exports.inactiveList = async (req, res) => {
    try {
        const result = await vUserService.getInactiveVendorList();
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(300).json({ status: 300, message: error });
    }
}


// 3 => Active this particular through phonoNo
exports.activateVendor = async (req, res) => {
    const {phoneNo}  = req.body;

    try {
        
        if (!phoneNo) 
            return { status: 300, message: 'Vendor Phone Number and Name is Mandatory'};

        const result = await vUserService.activeNewVendor(phoneNo);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(300).json({ status: 300, message: error });
    }
}

// 4 => Get vendor details
exports.vendorDetails = async (req, res) => {

    const phoneNo = req.params?.phoneNo;
    // const {phoneNo} = req.body;
    console.log("--------" +phoneNo);

    if (!phoneNo)
        return res.status(300).json({ status: 300, message: 'Phone Number is Mandatory' })
        
    try {
        const result = await vUserService.getVendorDetail(phoneNo);
        res.json(result)
        console.log(JSON.stringify(result));
    } catch (error) {
        console.error(error);
        res.status(300).json(error);
    }
}


// 5 => De-active this vendor
exports.deactivateVendor = async (req, res) => {
    const { phoneNo } = req.body;

    try {
        const result = await vUserService.deactivateThisVendor(phoneNo);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(300).json({ status: 300, message: error });
    }
}
