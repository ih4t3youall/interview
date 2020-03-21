const express = require('express');
const router = express.Router();
const user_service = require('../services/user_service');
const alert_service = require('../services/alert_service');
const sighting_service = require('../services/sighting_service');


router.get('/', /*[auth, admin] ,*/ async (req, res) => {
    const user_count = await user_service.getUserCount();
    const alert_count = await alert_service.getAlertCount();
    const active_alert_count = await alert_service.getActiveAlerts();
    const sightings_count = await sighting_service.getSightingCount();
    const alerts_locations = await alert_service.getAlertsLocationsArray();

    res.render('index.html', {user_count: user_count, alert_count: alert_count, active_alert_count: active_alert_count, sightings_count: sightings_count, alerts_locations: alerts_locations});
});


router.get('/query', /*[auth, admin] ,*/ async (req, res) => {
    const user_count = await user_service.getUserCount();
    const alert_count = await alert_service.getAlertCount();
    const active_alert_count = await alert_service.getActiveAlerts();
    const sightings_count = await sighting_service.getSightingCount();

    res.render('index.html', {user_count: user_count, alert_count: alert_count, active_alert_count: active_alert_count, sightings_count: sightings_count});
});


module.exports = router;