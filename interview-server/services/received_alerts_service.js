const receivedAlertDAO  = require('../dao/receivedAlertsDAO');
const alert_service  = require('../services/alert_service');
const Joi = require('@hapi/joi');
const util = require('util');

const schema = {
    id: Joi.number(),
    user_id: Joi.number().required(),
    alert_id: Joi.number().required(),
    involved: Joi.boolean().required()
};

module.exports.validateReceivedAlert = function validateReceivedAlert(Alert) {
    return Joi.validate(Alert, schema);
};

module.exports.getSchema = function getSchema(){
    return util.inspect(schema, {'depth':0});
};

module.exports.createReceivedAlert = async function createReceivedAlert(Alert) {
    return await receivedAlertDAO.createReceivedAlert(Alert);
};


module.exports.updateReceivedAlert = async function updateReceivedAlert(id, received_alert) {
    const options = {
        where: {
            "id" : id
        }
    };
    return await receivedAlertDAO.updateReceivedAlert(received_alert, options);
};


module.exports.findReceivedAlertsByUserID = async function findReceivedAlertsByUserID(user_id, involved) {
    const where = {
        raw: true,
        where: {
            "user_id" : user_id
        }
    };
    if (involved != null){
        where.where['involved'] = involved;
    }
    let received_alerts = await receivedAlertDAO.findReceivedAlert(where);
    let alert_id_array = [];
    received_alerts.forEach(function(received_alert){
        alert_id_array.push(received_alert.alert_id);
    });

    return await alert_service.findAlertsByID(alert_id_array);
};