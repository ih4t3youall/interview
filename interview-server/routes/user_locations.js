const auth = require("../middleware/auth");
const user_location_service = require("../services/user_location_service");
const express = require('express');
const router = express.Router();

router.post('/', auth, async (req, res) => {
  const coordinates = req.body;
  const { error } = user_location_service.validateCoordinates(coordinates);

  if (error) return res.status(400).send(error.details[0].message);

  const user_id = req.user.id;
  const updated = await user_location_service.updateUserLocation(user_id, coordinates.coordinates);

  res.send({'updated': updated});
});

module.exports = router;