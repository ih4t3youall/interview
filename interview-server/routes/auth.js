const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');
const user_service = require('../services/user_service');
const express = require('express');
const _ = require('lodash');
const router = express.Router();
const FacebookTokenStrategy = require('passport-facebook-token');
const passport = require('passport');
const config = require('config');


passport.use('facebook-token', new FacebookTokenStrategy({
      clientID        : config.auth_facebook_api_key,
      clientSecret    : config.auth_facebook_api_secret
    },
    function(accessToken, refreshToken, profile, done) { // If we validate the  user using the access_token, then all we need is the email to get the user from the DB.

      const user = {
        'email': profile.emails[0].value
      };

      return done(null, user); // the user object we just made gets passed to the route's controller as `req.user`
    }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});

// Log In using facebook. We received a POST with an "access_token" field.
router.post('/facebook', passport.initialize(), passport.authenticate('facebook-token'), async (req, res) => {

  let user = await user_service.findUserByEmail(req.user.email); // email we got from the facebook service
  if (!user) return res.status(400).send('There is no user registered with the email: ' + req.user.email);

  user = _.pick(user, ['id', 'name', 'surname', 'dni', 'language']);
  user['_token'] = user_service.generateAuthToken(user);
  res.send(user);
});



router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await user_service.findUserByEmail(req.body.email);
  if (!user) return res.status(400).send('Invalid email or password.');

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid email or password.');
  user = _.pick(user, ['id', 'name', 'surname', 'dni', 'language']);
  user['_token'] = user_service.generateAuthToken(user);
  res.send(user);
});

function validate(req) {
  const schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().required(),
  };

  return Joi.validate(req, schema);
}

module.exports = router; 
