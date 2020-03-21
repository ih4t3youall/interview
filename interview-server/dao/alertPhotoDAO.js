const {AlertPhoto, sequelize} = require('../db/sequelize');

module.exports.createAlertPhoto = async function createAlertPhoto(obj){
    const created = await AlertPhoto.create(obj);
    return created.dataValues;
};

module.exports.findAlertPhoto = async function findAlertPhoto(options){
    return await AlertPhoto.findAll(options);
};


module.exports.deleteAlertPhoto = async function deleteAlertPhoto(options){
    const deleted = await AlertPhoto.destroy(options);
    return deleted === 1; // True if deleted, false otherwise
};


module.exports.getPhotosCount = async function getPhotosCount(user_id, alert_id){
    const result = await sequelize.query('SELECT COUNT(*) FROM "Alert_Photos", "Alerts" WHERE "Alert_Photos".alert_id = ? AND "Alert_Photos".alert_id = "Alerts".id AND "Alerts".id = ?',
        { replacements: [alert_id, user_id], type: sequelize.QueryTypes.RAW }
    );

    return result[0][0];
};