const db = require('../../../models/index');
const apierror = require('../../helpers/api-error');

exports.saveNewRides = async (ridesObj) => {
    const { bookingId, userId } = ridesObj;

    if (!bookingId && !userId)
        apierror.throwUnknownError('BookingId and UserId is missing.!')

    const rideModel = await db.custrideshistory(ridesObj);
    const result = await rideModel.save();
 
    if (!result)
        apierror.throwUnknownError('DB Insertion error')

    return { status: 200, message: 'Rides saved successfully.' }
}


exports.getRides = async () => {

}