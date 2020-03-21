const alert_service = require('../services/alert_service');
const logger = require('../util/logger')('alert_route');
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const express = require('express');
const router = express.Router();
const push = require("../util/alert_notification")


// ** GET **

// Get All  Alerts
router.get('/all', [auth, admin], async (req, res) => {
    logger.info("Getting all alerts");
    const result = await alert_service.findAll();
    res.send(result);
});

// Get Alert Schema
router.get('/schema', async (req, res) => {
    logger.info("Getting alert schema");
    const schema = alert_service.getSchema();
    res.send(schema);
});


// Get Alert by ID
router.get('/:id', [auth, admin], async (req, res) => {
    logger.info("Getting alert with id " + req.params.id);
    const result = await alert_service.findAlertByID(req.params.id);
    res.send(result);
});


// Get Current User Alerts
router.get('/', auth, async (req, res) => {
    logger.info("Getting current user alerts with id " + req.user.id);
    const alert = await alert_service.findAlertByOwnerID(req.user.id);
    res.send(alert);
});


// ** POST **

// Create Alert
router.post('/', auth, async (req, res) => {
    const alert = req.body;
    alert.owner = req.user.id; // The alert owner is the user that is creating it
    logger.info("User " + alert.owner + " is creating the alert " + JSON.stringify(alert));
    let { error } = alert_service.validateAlert(alert); // Validate alert
    if (error) return res.status(400).send(error.details[0].message);

    // Some logic to see if already exists in the near area, to prevent the user from generating lots of alerts.
    // error = await alert_service.alertExist(alert);
    // if (error) return res.status(400).send("Alert already exist in nearby area");

    let created_alert = await alert_service.createAlert(alert); // Create the Alert
    let notified_count = await push.notifyNearbyUsers(alert.location.coordinates[0], alert.location.coordinates[1], created_alert); // Send push notification to nearby Users
    created_alert.notified_count = notified_count;
    await alert_service.updateAlert(created_alert.id, created_alert); // Update DB with the number of users reached.

    res.send(created_alert);
});


// ** PUT **

// Update Alert
router.put('/:id', auth, async (req, res) => {
    const alert = req.body;
    logger.info("Update alert called " + JSON.stringify(alert));
    const { error } = alert_service.validateAlert(alert); // Validate alert
    if (error) return res.status(400).send(error.details[0].message);

    const alert_id = req.params.id;
    const updated = await alert_service.updateAlert(alert_id, alert);

    res.send({'updated': updated});
});


// ** DELETE **

// Delete Alert by ID
router.delete('/:id', auth, async (req, res) => {
    const alert_id = req.params.id;
    logger.info("User " + req.user.id + " to delete alert " + alert_id + " called");
    const alert = await alert_service.findAlertByID(alert_id);
    if (alert.owner === req.user.id){
        const deleted = await alert_service.deleteAlertByID(alert_id);
        res.send({'deleted': deleted});
    }
    else{
        logger.error("Alert " + alert_id + " doesn't belong to the current user with id " + req.user.id);
        res.send({'error': "This Alert doesnt belong to the current user"})
    }
});

module.exports = router;