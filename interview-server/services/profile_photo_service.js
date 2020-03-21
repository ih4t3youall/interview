const logger = require('../util/logger')('profile_photo_service');
const profilePhotoDAO  = require('../dao/profilePhotoDAO');
const fs  = require('fs');

module.exports.photosForProfileExceeded = async function photosForProfileExceeded(user_id, profile_id, limit) {
    const countObj = await profilePhotoDAO.getPhotosCount(user_id, profile_id);
    return parseInt(countObj.count) >= limit; // Returns true if there count is equal or more than the limit. Else false.
};

module.exports.createProfilePhoto = async function createProfilePhoto(profile_id, filepath) {
    const obj = {
        'profile_id' : profile_id,
        'path' : filepath
    };
    return await profilePhotoDAO.createProfilePhoto(obj);
};

module.exports.deleteProfilePhotoByID = async function deleteProfilePhotoByID(id) {
    const options = {
        raw: true,
        where: {
            "id" : id
        }
    };

    const profile_photo = await profilePhotoDAO.findProfilePhoto(options);
    if (profile_photo.length === 0) return false;
    const path = profile_photo[0].path;

    const deleted = await profilePhotoDAO.deleteProfilePhoto(options);
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


module.exports.findProfilePhotoByID = async function findProfilePhotoByID(id) {
    const options = {
        raw: true,
        where: {
            "id" : id
        }
    };
    const profile_photo = await profilePhotoDAO.findProfilePhoto(options);
    if (profile_photo.length === 0) return false;

    return profile_photo[0]
};

module.exports.findProfilePhotosByProfileID = async function findProfilePhotosByProfileID(profile_id) {
    const options = {
        raw: true,
        where: {
            "profile_id" : profile_id
        },
        attributes: ['id', 'profile_id', 'createdAt']
    };
    return await profilePhotoDAO.findProfilePhoto(options);
};
