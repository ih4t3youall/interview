const express = require('express');
const cors = require('../middleware/cors');
const error = require('../middleware/error');
const users = require('../routes/users');
const auth = require('../routes/auth');
const alerts = require('../routes/alerts');
const received_alerts = require('../routes/received_alerts');
const profiles = require('../routes/profiles');
const profile_photo = require('../routes/profile_photos');
const alert_photo = require('../routes/alert_photos');
const user_location = require('../routes/user_locations');
const comments = require('../routes/comments');
const sightings = require('../routes/sightings');
const sighting_photo = require('../routes/sighting_photos');
const web = require('../routes/web');

module.exports =  function (app) {
    app.use(cors);
    app.use(express.json());
    app.use('/api/user_location', user_location);
    app.use('/api/received_alerts', received_alerts);
    app.use('/api/comments', comments);
    app.use('/api/users', users);
    app.use('/api/alerts', alerts);
    app.use('/api/profiles', profiles);
    app.use('/api/sightings', sightings);
    app.use('/api/sighting_photo', sighting_photo);
    app.use('/api/profile_photo', profile_photo);
    app.use('/api/alert_photo', alert_photo);
    app.use('/api/auth', auth);
    app.use('/web', web);
    app.use(error);
};