const received_alerts_service = require('../services/received_alerts_service');
const logger = require('../util/logger')('received_alerts_route');
const auth = require("../middleware/auth");
const express = require('express');
const router = express.Router();


// ** GET **


// Get Received Alert Schema
router.get('/schema', async (req, res) => {
    logger.info("Getting received alert schema");
    const schema = received_alerts_service.getSchema();
    res.send(schema);
});

// Get Current User Received Alerts where the user is not involved
router.get('/involved', auth, async (req, res) => {
    logger.info("Getting current user received alerts with id " + req.user.id);
    const alert = await received_alerts_service.findReceivedAlertsByUserID(req.user.id, true);
    res.send(alert);
});

// Get Current User Received Alerts where the user is not involved
router.get('/notinvolved', auth, async (req, res) => {
    logger.info("Getting current user received alerts with id " + req.user.id);
    const alert = await received_alerts_service.findReceivedAlertsByUserID(req.user.id, false);
    res.send(alert);
});

// Get Current User Received Alerts
router.get('/', auth, async (req, res) => {
    logger.info("Getting current user received alerts with id " + req.user.id);
    const alert = await received_alerts_service.findReceivedAlertsByUserID(req.user.id, null);
    res.send(alert);
});



// ** POST **

// Create Received Alert
router.post('/', auth, async (req, res) => {
    const received_alert = req.body;
    received_alert.user_id = req.user.id; // The alert owner is the user that is creating it
    logger.info("User " + received_alert.user_id + " is creating the received alert " + JSON.stringify(received_alert));

    let { error } = received_alerts_service.validateReceivedAlert(received_alert); // Validate received alert
    if (error) return res.status(400).send(error.details[0].message);

    const result = await received_alerts_service.createReceivedAlert(received_alert);
    res.send(result);
});


// ** PUT **

// Update Received Alert
router.put('/:id', auth, async (req, res) => {
    const received_alert = req.body;
    logger.info("Update received alert called " + JSON.stringify(received_alert));
    const { error } = received_alerts_service.validateReceivedAlert(received_alert); // Validate alert
    if (error) return res.status(400).send(error.details[0].message);

    const alert_id = req.params.id;
    const updated = await received_alerts_service.updateReceivedAlert(alert_id, received_alert);

    res.send({'updated': updated});
});


module.exports = router;