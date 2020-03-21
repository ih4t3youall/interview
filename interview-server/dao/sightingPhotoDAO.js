const {SightingPhoto, sequelize} = require('../db/sequelize');

module.exports.createSightingPhoto = async function createSightingPhoto(obj){
    const created = await SightingPhoto.create(obj);
    return created.dataValues;
};

module.exports.findSightingPhoto = async function findSightingPhoto(options){
    return await SightingPhoto.findAll(options);
};


module.exports.deleteSightingPhoto = async function deleteSightingPhoto(options){
    const deleted = await SightingPhoto.destroy(options);
    return deleted === 1; // True if deleted, false otherwise
};


module.exports.getPhotosCount = async function getPhotosCount(user_id, sighting_id){
    const result = await sequelize.query('SELECT COUNT(*) FROM "Sighting_Photos", "Sightings" WHERE "Sighting_Photos".sighting_id = ? AND "Sighting_Photos".sighting_id = "Sightings".id AND "Sightings".created_by = ?',
        { replacements: [sighting_id, user_id], type: sequelize.QueryTypes.RAW }
    );

    return result[0][0];
};