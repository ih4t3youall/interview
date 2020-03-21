const {ProfilePhoto, sequelize} = require('../db/sequelize');

module.exports.createProfilePhoto = async function createProfilePhoto(obj){
    const created = await ProfilePhoto.create(obj);
    return created.dataValues;
};

module.exports.findProfilePhoto = async function findProfilePhoto(options){
    return await ProfilePhoto.findAll(options);
};


module.exports.deleteProfilePhoto = async function deleteProfilePhoto(options){
    const deleted = await ProfilePhoto.destroy(options);
    return deleted === 1; // True if deleted, false otherwise
};


module.exports.getPhotosCount = async function getPhotosCount(user_id, profile_id){
    const result = await sequelize.query('SELECT COUNT(*) FROM "Profile_Photos", "User_Profiles" WHERE "Profile_Photos".profile_id = ? AND "Profile_Photos".profile_id = "User_Profiles".id AND "User_Profiles".user_id = ?',
        { replacements: [profile_id, user_id], type: sequelize.QueryTypes.RAW }
    );

    return result[0][0];
};