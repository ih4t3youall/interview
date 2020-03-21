const userLocationDAO  = require('../dao/userLocationDAO');
const Joi = require('@hapi/joi');

const schema = {
    coordinates: Joi.array().required()
};

module.exports.validateCoordinates = function validateCoordinates(coordinates) {
    return Joi.validate(coordinates, schema);
};

module.exports.updateUserLocation = async function updateUserLocation(user_id, coordinates) {
    const options = {
        where: {
            "user_id" : user_id
        }
    };
    const user_location = {
        user_id: user_id,
        location: {type: 'Point', coordinates: coordinates}
    };
    return await userLocationDAO.updateUserLocation(user_location, options);
};

