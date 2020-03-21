const profileDAO  = require('../dao/profileDAO');
const Joi = require('@hapi/joi');
const util = require('util');

const schema = {
    id: Joi.number(),
    user_id: Joi.number().required(),
    type: Joi.string().valid('PERSON', 'CAR', 'MOTORCYCLE').required(),
    description: Joi.string().required(),
    licence_plate: Joi.string(),
    title: Joi.string().required()
};

module.exports.validateProfile = function validateProfile(Profile) {
    return Joi.validate(Profile, schema);
};

module.exports.getSchema = function getSchema(){
    return util.inspect(schema, {'depth':0});
};

module.exports.createProfile = async function createProfile(Profile) {
    return await profileDAO.createProfile(Profile);
};


module.exports.updateProfile = async function updateProfile(profile_id, profile) {
    const options = {
        where: {
            "id" : profile_id
        }
    };
    return await profileDAO.updateProfile(profile, options);
};

module.exports.deleteProfileByID = async function deleteProfileByID(profile_id) {
    const options = {
        raw: true,
        where: {
            "id" : profile_id
        }
    };
    return await profileDAO.deleteProfile(options);
};

module.exports.findProfilesByUserID = async function findProfilesByUserID(user_id) {
    const where = {
        raw: true,
        where: {
            "user_id" : user_id
        }
    };
    return await profileDAO.findProfile(where);
};

module.exports.findProfileByID = async function findProfileByID(profile_id) {
    const where = {
        raw: true,
        where: {
            "id" : profile_id
        }
    };
    const profile =  await profileDAO.findProfile(where);
    if (profile.length > 0) {
        return profile[0];
    } else {
        return [];
    }
};
