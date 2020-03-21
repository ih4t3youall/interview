const {Alert, sequelize} = require('../db/sequelize');

module.exports.createAlert = async function createAlert(obj){
    const created = await Alert.create(obj);
    return created.dataValues;
};

module.exports.deleteAlert = async function deleteAlert(options){
    const deleted = await Alert.destroy(options);
    return deleted === 1; // True if deleted, false otherwise
};

module.exports.updateAlert = async function updateAlert(alert, options){
    const updated = await Alert.update(alert, options);
    return updated[0] === 1; // True if updated, false otherwise
};

module.exports.findAlert = async function findAlert(options){
    return await Alert.findAll(options);
};

module.exports.alertCount = async function alertCount(){
    const result = await sequelize.query('SELECT COUNT(*) FROM "Alerts"');
    return result[0][0];
};

module.exports.getActiveAlerts = async function getActiveAlerts(){
    const result = await sequelize.query('SELECT COUNT(*) FROM "Alerts" WHERE "createdAt" >= now() - interval \'2 week\'');
    return result[0][0];
};

module.exports.getAlertsLocationsArray = async function getAlertsLocationsArray(){
    const result = await sequelize.query('SELECT ST_X(location) as lat, ST_Y(location) as lng FROM "Alerts"');
    return result[0];
};


