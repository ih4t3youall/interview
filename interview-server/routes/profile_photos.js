const logger = require('../util/logger')('profile_photo_route');
const auth = require("../middleware/auth");
const directory = require("../middleware/directory");
const profile_photo_service = require('../services/profile_photo_service');
const storage = require('../util/storage');
const express = require('express');
const router = express.Router();
const photos_per_profile_limit = 7;

// ** GET **

//Get Profile Photo by ID (Sends Picture)
router.get('/:id', auth, async (req, res) => {
    const id = req.params.id;
    logger.info("Getting profile photo by id " + id);
    const result = await profile_photo_service.findProfilePhotoByID(id);
    if (!result) res.status(404).send("Photo not found");
    res.sendFile(result.path);
});

//Get All Profile Photos belonging to a Profile (Sends JSON)
router.get('/profile/:id', auth, async (req, res) => {
    const profile_id = req.params.id;
    if (!profile_id) {logger.error("profile_id parameter required"); res.status(400).send("profile_id parameter required");}
    logger.info("Getting profile photo by profile owner with id " + profile_id);
    const result = await profile_photo_service.findProfilePhotosByProfileID(profile_id);
    res.send(result);
});


// * DELETE *

// Delete
router.delete('/:id', auth, async (req, res) => {
    logger.info("Delete profile photo called with id " + req.params.id);
    const profile_photo_id = req.params.id;
    const deleted = await profile_photo_service.deleteProfilePhotoByID(profile_photo_id);
    res.send({'deleted': deleted});
});

// * POST *

// Create
router.post('/', [auth, directory, storage.single('image')], async (req, res) => {
    const user_id = req.user.id;
    const profile_id = req.body.profile_id;
    const filepath = req.file.path;

    logger.info("Create profile photo called by " + user_id);
    if (!profile_id) {logger.error("No profile_id provided"); return res.status(400).send({'created': false, 'error': "No profile_id provided"})};

    // Check that the user doesnt have more than X photos for this profile.
    const exceeded = await profile_photo_service.photosForProfileExceeded(user_id, profile_id, photos_per_profile_limit);
    if (exceeded) {
        logger.error("You cant have more than " + photos_per_profile_limit + " photos per profile");
        profile_photo_service.deletePhoto(filepath);
        return res.status(406).send({'created': false, 'error': "You cant have more than " + photos_per_profile_limit + " photos per profile"});
    }

    // Create new profile photo entry in the DB.
    const result = await profile_photo_service.createProfilePhoto(profile_id, filepath);
    res.send({'created': true, 'id': result.id});
});

module.exports = router;