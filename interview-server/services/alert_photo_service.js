const logger = require('../util/logger')('alert_photo_service');
const alertPhotoDAO  = require('../dao/alertPhotoDAO');
const fs  = require('fs');

module.exports.photosForAlertExceeded = async function photosForAlertExceeded(user_id, alert_id, limit) {
    const countObj = await alertPhotoDAO.getPhotosCount(user_id, alert_id);
    return parseInt(countObj.count) >= limit; // Returns true if there count is equal or more than the limit. Else false.
};

module.exports.createAlertPhoto = async function createAlertPhoto(alert_id, filepath) {
    const obj = {
        'alert_id' : alert_id,
        'path' : filepath
    };
    return await alertPhotoDAO.createAlertPhoto(obj);
};

module.exports.deleteAlertPhotoByID = async function deleteAlertPhotoByID(id) {
    const options = {
        raw: true,
        where: {
            "id" : id
        }
    };

    const alert_photo = await alertPhotoDAO.findAlertPhoto(options);
    if (alert_photo.length === 0) return false;
    const path = alert_photo[0].path;

    const deleted = await alertPhotoDAO.deleteAlertPhoto(options);
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


module.exports.findAlertPhotoByID = async function findAlertPhotoByID(id) {
    const options = {
        raw: true,
        where: {
            "id" : id
        }
    };
    const alert_photo = await alertPhotoDAO.findAlertPhoto(options);
    if (alert_photo.length === 0) return false;

    return alert_photo[0]
};

module.exports.findAlertPhotosByAlertID = async function findAlertPhotosByAlertID(alert_id) {
    const options = {
        raw: true,
        where: {
            "alert_id" : alert_id
        },
        attributes: ['id', 'alert_id', 'createdAt']
    };
    return await alertPhotoDAO.findAlertPhoto(options);
};
