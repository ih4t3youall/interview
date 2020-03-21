const auth = require("../middleware/auth");
const sighting_service = require("../services/sighting_service");
const logger = require('../util/logger')('sightings_route');
const express = require('express');
const router = express.Router();


// Create Sighting
router.post('/', auth, async (req, res) => {
  const sighting_obj = req.body;
  logger.info("User " + req.user.id + " is creating the sighting " + JSON.stringify(sighting_obj));
  sighting_obj['created_by'] = req.user.id; // Adding user to the sighting

  const { error } = sighting_service.validateSighting(sighting_obj);
  if (error) return res.status(400).send(error.details[0].message);

  const created = await sighting_service.createSighting(sighting_obj);

  res.send({'created': created});
});


// Delete Sighting by ID
router.delete('/:id', auth, async (req, res) => {
  const sighting_id = req.params.id;
  logger.info("User " + req.user.id + " to delete sighting " + sighting_id + " called");
  const deleted = await sighting_service.deleteSightingByID(sighting_id);
  res.send({'deleted': deleted});
});

module.exports = router;