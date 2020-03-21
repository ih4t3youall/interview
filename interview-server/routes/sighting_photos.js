const logger = require('../util/logger')('sighting_photo_route');
const auth = require("../middleware/auth");
const directory = require("../middleware/directory");
const sighting_photo_service = require('../services/sighting_photo_service');
const storage = require('../util/storage');
const express = require('express');
const router = express.Router();
const photos_per_sighting_limit = 7;

// ** GET **

//Get Sighting Photo by ID (Sends Picture)
router.get('/:id', auth, async (req, res) => {
    const id = req.params.id;
    logger.info("Getting sighting photo by id " + id);
    const result = await sighting_photo_service.findSightingPhotoByID(id);
    if (!result) res.status(404).send("Photo not found");
    res.sendFile(result.path);
});

//Get All Sighting Photos belonging to a Sighting (Sends JSON)
router.get('/', auth, async (req, res) => {
    const sighting_id = req.body.sighting_id;
    if (!sighting_id) {logger.error("sighting_id parameter required"); res.status(400).send("sighting_id parameter required");}
    logger.info("Getting sighting photo by sighting owner with id " + sighting_id);
    const result = await sighting_photo_service.findSightingPhotosBySightingID(sighting_id);
    res.send(result);
});


// * DELETE *

// Delete
router.delete('/:id', auth, async (req, res) => {
    logger.info("Delete sighting photo called with id " + req.params.id);
    const sighting_photo_id = req.params.id;
    const deleted = await sighting_photo_service.deleteSightingPhotoByID(sighting_photo_id);
    res.send({'deleted': deleted});
});

// * POST *

// Create
router.post('/', [auth, directory, storage.single('image')], async (req, res) => {
    const user_id = req.user.id;
    const sighting_id = req.body.sighting_id;
    const filepath = req.file.path;

    logger.info("Create sighting photo called by " + user_id);
    if (!sighting_id) {logger.error("No sighting_id provided"); return res.status(400).send({'created': false, 'error': "No sighting_id provided"})};

    // Check that the user doesnt have more than X photos for this sighting.
    const exceeded = await sighting_photo_service.photosForSightingExceeded(user_id, sighting_id, photos_per_sighting_limit);
    if (exceeded) {
        logger.error("You cant have more than " + photos_per_sighting_limit + " photos per sighting");
        sighting_photo_service.deletePhoto(filepath);
        return res.status(406).send({'created': false, 'error': "You cant have more than " + photos_per_sighting_limit + " photos per sighting"});
    }

    // Create new sighting photo entry in the DB.
    const result = await sighting_photo_service.createSightingPhoto(sighting_id, filepath);
    res.send({'created': true, 'id': result.id});
});

module.exports = router;