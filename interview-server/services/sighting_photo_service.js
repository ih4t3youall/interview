const logger = require('../util/logger')('sighting_photo_service');
const sightingPhotoDAO  = require('../dao/sightingPhotoDAO');
const fs  = require('fs');

module.exports.photosForSightingExceeded = async function photosForSightingExceeded(user_id, sighting_id, limit) {
    const countObj = await sightingPhotoDAO.getPhotosCount(user_id, sighting_id);
    return parseInt(countObj.count) >= limit; // Returns true if there count is equal or more than the limit. Else false.
};

module.exports.createSightingPhoto = async function createSightingPhoto(sighting_id, filepath) {
    const obj = {
        'sighting_id' : sighting_id,
        'path' : filepath
    };
    return await sightingPhotoDAO.createSightingPhoto(obj);
};

module.exports.deleteSightingPhotoByID = async function deleteSightingPhotoByID(id) {
    const options = {
        raw: true,
        where: {
            "id" : id
        }
    };

    const sighting_photo = await sightingPhotoDAO.findSightingPhoto(options);
    if (sighting_photo.length === 0) return false;
    const path = sighting_photo[0].path;

    const deleted = await sightingPhotoDAO.deleteSightingPhoto(options);
    if(deleted){
        await module.exports.deletePhoto(path);
        return true
    } else{
        return false
    }
};

module.exports.deletePhoto = async function deletePhoto(filepath) {
    fs.unlink(filepath, (err) => {
        if (err) {
            logger.error("Couldn't delete photo: " + filepath);
            logger.error(err.stack);
            return false
        }
        return true
    })
};


module.exports.findSightingPhotoByID = async function findSightingPhotoByID(id) {
    const options = {
        raw: true,
        where: {
            "id" : id
        }
    };
    const sighting_photo = await sightingPhotoDAO.findSightingPhoto(options);
    if (sighting_photo.length === 0) return false;

    return sighting_photo[0]
};

module.exports.findSightingPhotosBySightingID = async function findSightingPhotosBySightingID(sighting_id) {
    const options = {
        raw: true,
        where: {
            "sighting_id" : sighting_id
        },
        attributes: ['id', 'sighting_id', 'createdAt']
    };
    return await sightingPhotoDAO.findSightingPhoto(options);
};
