const {ReceivedAlert} = require('../db/sequelize');

module.exports.createReceivedAlert = async function createReceivedAlert(obj){
    const created = await ReceivedAlert.create(obj);
    return created.dataValues;
};


module.exports.updateReceivedAlert = async function updateReceivedAlert(alert, options){
    const updated = await ReceivedAlert.update(alert, options);
    return updated[0] === 1; // True if updated, false otherwise
};

module.exports.findReceivedAlert = async function findReceivedAlert(options){
    return await ReceivedAlert.findAll(options);
};