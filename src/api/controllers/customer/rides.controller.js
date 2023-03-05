
const rideService = require('../../services/customer/rides.service');


exports.saveNewRide = async (req, res, next) => {
    // const { rideObj } = req.body;
    console.log(JSON.stringify(req.body))
    try {
        const result = await rideService.saveNewRides(req.body);
        res.status(200).json(result);

    } catch (error) {
        console.error(error);
        return next(error);
    }
}