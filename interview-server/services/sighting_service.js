const sightingDAO  = require('../dao/sightingDAO');
const Joi = require('@hapi/joi');

const schema = {
    id: Joi.number(),
    alert_id: Joi.number().required(),
    created_by: Joi.number().required(),
    location: Joi.object().keys({
        type: Joi.string().valid('Point').required(),
        coordinates: Joi.array().items(
            Joi.number().required(), Joi.number().required()
        )}).required()
};

module.exports.validateSighting = function validateSighting(sighting) {
    return Joi.validate(sighting, schema);
};

module.exports.createSighting = async function createSighting(Sighting) {
    return await sightingDAO.createSighting(Sighting);
};


module.exports.deleteSightingByID = async function deleteSightingByID(sighting_id) {
    const options = {
        raw: true,
        where: {
            "id" : sighting_id
        }
    };
    return await sightingDAO.deleteSighting(options);
};


module.exports.getSightingCount = async function getSightingCount() {
    const result = await sightingDAO.sightingCount();
    return result.count;
};