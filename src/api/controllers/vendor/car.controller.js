const vCarService = require('../../services/vendor/car.service');


exports.newCarRegistration = async (req, res) => {

    try {
        const result = await vCarService.registerNewCar(req.body);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(300).json({ status: 300, message: error });
    }

}


exports.inactiveCarList = async (req, res) => {
    try {
        const result = await vCarService.getInactiveVendorCarList();
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(300).json({ status: 300, message: error });
    }
}


exports.activateVendorCar = async (req, res) => {
    const carNo = req.params?.carNo;

    try {
        const result = await vCarService.activateVendorCar(carNo);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(300).json({ status: 300, message: error });
    }
}

exports.deactivateVendorCar = async (req, res) => {
    const carNo = req.params.carNo;

    try {
        const result = await vCarService.deactivateThisVendorCar(carNo);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(300).json({ status: 300, message: error });
    }
}