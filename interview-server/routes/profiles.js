const auth = require("../middleware/auth");
const logger = require('../util/logger')('profile_route');
const profile_service = require('../services/profile_service');
const express = require('express');
const router = express.Router();

// ** GET **

// Get Alert Schema
router.get('/schema', async (req, res) => {
    logger.info("Getting profile schema");
    const schema = profile_service.getSchema();
    res.send(schema);
});

// Get current user profiles
router.get('/', auth, async (req, res) => {
    logger.info("Getting current user profiles with id " + req.user.id);
    const result = await profile_service.findProfilesByUserID(req.user.id);
    res.send(result);
});


// ** PUT **

// Update profile
router.put('/:id', auth, async (req, res) => {
    const profile = req.body;
    logger.info("Updating profile " + req.params.id + " with payload " + JSON.stringify(profile));
    const { error } = profile_service.validateProfile(profile); // Validate profile
    if (error) return res.status(400).send(error.details[0].message);

    const profile_id = req.params.id;
    const updated = await profile_service.updateProfile(profile_id, profile);

    res.send({'updated': updated});
});


// * DELETE *

// Delete
router.delete('/:id', auth, async (req, res) => {
    const profile_id = req.params.id;
    logger.info("Deleting profile " + profile_id);

    const profile = await profile_service.findProfileByID(profile_id);
    if (profile.user_id === req.user.id){
        const deleted = await profile_service.deleteProfileByID(profile_id);
        res.send({'deleted': deleted});
    }
    else{
        logger.error("Profile " + profile_id + " doesn't belong to the current user with id " + req.user.id);
        res.send({'error': "This Profile doesnt belong to the current user"})
    }
});


// * POST *

// Create
router.post('/', auth, async (req, res) => {
    const profile = req.body;
    profile.user_id = req.user.id;
    logger.info("Creating profile " + JSON.stringify(profile));
    let { error } = profile_service.validateProfile(profile); // Validate profile
    if (error) return res.status(400).send(error.details[0].message);

    const result = await profile_service.createProfile(profile);
    res.send(result);
});

module.exports = router;