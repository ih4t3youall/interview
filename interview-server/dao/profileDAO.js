const {UserProfile} = require('../db/sequelize');

module.exports.createProfile = async function createProfile(obj){
    const created = await UserProfile.create(obj);
    return created.dataValues;
};

module.exports.deleteProfile = async function deleteProfile(options){
    const deleted = await UserProfile.destroy(options);
    return deleted === 1; // True if deleted, false otherwise
};

module.exports.updateProfile = async function updateProfile(alert, options){
    const updated = await UserProfile.update(alert, options);
    return updated[0] === 1; // True if updated, false otherwise
};

module.exports.findProfile = async function findProfile(options){
    return await UserProfile.findAll(options);
};