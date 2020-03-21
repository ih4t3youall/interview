const logger = require('../util/logger')('alert_photo_route');
const auth = require("../middleware/auth");
const directory = require("../middleware/directory");
const alert_photo_service = require('../services/alert_photo_service');
const storage = require('../util/storage');
const express = require('express');
const router = express.Router();
const photos_per_alert_limit = 7;

// ** GET **

//Get Alert Photo by ID (Sends Picture)
router.get('/:id', auth, async (req, res) => {
    const id = req.params.id;
    logger.info("Getting alert photo by id " + id);
    const result = await alert_photo_service.findAlertPhotoByID(id);
    if (!result) res.status(404).send("Photo not found");
    res.sendFile(result.path);
});

//Get All Alert Photos belonging to a Alert (Sends JSON)
router.get('/alert/:id', auth, async (req, res) => {
    const alert_id = req.params.id;
    if (!alert_id) {logger.error("alert_id parameter required"); res.status(400).send("alert_id parameter required");}
    logger.info("Getting alert photo by alert owner with id " + alert_id);
    const result = await alert_photo_service.findAlertPhotosByAlertID(alert_id);
    res.send(result);
});


// * DELETE *

// Delete
router.delete('/:id', auth, async (req, res) => {
    logger.info("Delete alert photo called with id " + req.params.id);
    const alert_photo_id = req.params.id;
    const deleted = await alert_photo_service.deleteAlertPhotoByID(alert_photo_id);
    res.send({'deleted': deleted});
});

// * POST *

// Create
router.post('/', [auth, directory, storage.single('image')], async (req, res) => {
    const user_id = req.user.id;
    const alert_id = req.body.alert_id;
    const filepath = req.file.path;

    logger.info("Create alert photo called by " + user_id);
    if (!alert_id) {logger.error("No alert_id provided"); return res.status(400).send({'created': false, 'error': "No alert_id provided"})};

    // Check that the user doesnt have more than X photos for this alert.
    const exceeded = await alert_photo_service.photosForAlertExceeded(user_id, alert_id, photos_per_alert_limit);
    if (exceeded) {
        logger.error("You cant have more than " + photos_per_alert_limit + " photos per alert");
        alert_photo_service.deletePhoto(filepath);
        return res.status(406).send({'created': false, 'error': "You cant have more than " + photos_per_alert_limit + " photos per alert"});
    }

    // Create new alert photo entry in the DB.
    const result = await alert_photo_service.createAlertPhoto(alert_id, filepath);
    res.send({'created': true, 'id': result.id});
});

module.exports = router;