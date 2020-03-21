const alertDAO  = require('../dao/alertDAO');
const Joi = require('@hapi/joi');
const util = require('util');

const schema = {
    id: Joi.number(),
    owner: Joi.number().required(),
    location: Joi.object().keys({
        type: Joi.string().valid('Point').required(),
        coordinates: Joi.array().items(
            Joi.number().required(), Joi.number().required()
        )}).required(),
    description: Joi.string().required(),
    type: Joi.string().valid('PERSON', 'CAR', 'MOTORCYCLE').required(),
    type_of_theft: Joi.string().valid('assault','robbed','undefined'),
    licence_plate: Joi.string().min(6).max(10).required(),
    found: Joi.boolean(),
    found_time: Joi.date()
};

module.exports.validateAlert = function validateAlert(Alert) {
    return Joi.validate(Alert, schema);
};

module.exports.getSchema = function getSchema(){
    return util.inspect(schema, {'depth':0});
};

module.exports.createAlert = async function createAlert(Alert) {
    return await alertDAO.createAlert(Alert);
};


module.exports.updateAlert = async function updateAlert(alert_id, alert) {
    const options = {
        where: {
            "id" : alert_id
        }
    };
    return await alertDAO.updateAlert(alert, options);
};

module.exports.deleteAlertByID = async function deleteAlertByID(alert_id) {
    const options = {
        raw: true,
        where: {
            "id" : alert_id
        }
    };
    return await alertDAO.deleteAlert(options);
};


module.exports.findAlertByOwnerID = async function findAlertByOwnerID(owner_id) {
    const where = {
        raw: true,
        where: {
            "owner" : owner_id
        }
    };
    const alert =  await alertDAO.findAlert(where);
    if (alert.length > 0) {
        return alert;
    } else {
        return [];
    }
};

module.exports.findAlertByID = async function findAlertByID(alert_id) {
    const where = {
        raw: true,
        where: {
            "id" : alert_id
        }
    };
    const alert =  await alertDAO.findAlert(where);
    if (alert.length > 0) {
        return alert[0];
    } else {
        return [];
    }
};

module.exports.findAlertsByID = async function findAlertsByID(alerts_id) {
    const where = {
        raw: true,
        where: {
            "id" : alerts_id
        }
    };
    const alert =  await alertDAO.findAlert(where);
    if (alert.length > 0) {
        return alert;
    } else {
        return [];
    }
};

module.exports.findAll = async function findAll() {
    const where = {
        raw: true,
        where: {}
    };
    return await alertDAO.findAlert(where);
};

module.exports.getAlertCount = async function getAlertCount() {
    const result = await alertDAO.alertCount();
    return result.count;
};

module.exports.getActiveAlerts = async function getActiveAlerts() {
    const result = await alertDAO.getActiveAlerts();
    return result.count;
};

module.exports.getAlertsLocationsArray = async function getAlertsLocationsArray() {
    return await alertDAO.getAlertsLocationsArray();
};
