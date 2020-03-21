const logger = require('../util/logger')('user_route');
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const user_service = require('../services/user_service');
const _ = require('lodash');
const express = require('express');
const router = express.Router();

// ** GET **

//Get All Users
router.get('/all', [auth, admin], async (req, res) => {
    logger.info("Getting all users");
    const result = await user_service.findAll();
    res.send(result);
});

// Get current User
router.get('/me', auth, async (req, res) => {
    logger.info("Getting current user with id " + req.user.id);
    let user = await user_service.findUserById(req.user.id);
    delete user.password;
    res.send(user);
});

// Get User Schema
router.get('/schema', async (req, res) => {
    logger.info("Getting user schema");
    const schema = user_service.getSchema();
    res.send(schema);
});

router.get('/:id', [auth, admin], async (req, res) => {
    logger.info("Getting user with id " + req.params.id);
    const result = await user_service.findUserById(req.params.id);
    res.send(result);
});



// ** PUT **

// Update Password
router.put('/password', auth, async (req, res) => {
    logger.info("Update current user password called with id " + req.user.id);
    const password = req.body;
    let { error } = user_service.validatePassword(password); // Validate password
    if (error) return res.status(400).send(error.details[0].message);

    const user_id = req.user.id;
    const updated = await user_service.updateUserPassword(user_id, password);

    res.send({'updated': updated});
});

// Update user by ID
router.put('/:id', [auth, admin], async (req, res) => {
    const user = req.body;
    logger.info("Update user called with id " + req.params.id + " with payload " + JSON.stringify(user));
    const { error } = user_service.validateUser(user); // Validate user
    if (error) return res.status(400).send(error.details[0].message);

    const user_id = req.params.id;
    delete user.password; // We dont update the password
    const updated = await user_service.updateUser(user_id, user);

    res.send({'updated': updated});
});

// Update
router.put('/', auth, async (req, res) => {
    const user = req.body;
    logger.info("Update current user called with id " + req.user.id + " with payload " + JSON.stringify(user));
    let { error } = user_service.validateUser(user); // Validate user
    if (error) return res.status(400).send(error.details[0].message);

    const user_id = req.user.id; // Get user ID from JWT token, and update current user.
    delete user.password; // We dont update the password
    const updated = await user_service.updateUser(user_id, user);

    res.send({'updated': updated});
});


// * DELETE *

// Delete
router.delete('/:id', [auth, admin], async (req, res) => {
    logger.info("Delete user called with id " + req.params.id);
    const user_id = req.params.id;
    const deleted = await user_service.deleteUserByID(user_id);
    res.send({'deleted': deleted});
});

// Delete
router.delete('/', auth, async (req, res) => {
    logger.info("Delete current user called with id " + req.user.id);
    const user_id = req.user.id; // Get user ID from JWT token, and delete current user.
    const deleted = await user_service.deleteUserByID(user_id);
    res.send({'deleted': deleted});
});


// * POST *

// Create
router.post('/', async (req, res) => {
    const user = req.body;
    logger.info("Create user called " + JSON.stringify(_.pick(user, ['name', 'surname', 'email', 'dani'])));
    let { error } = user_service.validateUser(user); // Validate user
    if (error) return res.status(400).send(error.details[0].message);

    error = await user_service.emailExist(user.email);
    if (error) {logger.info("Email already in use"); return res.status(400).send("Email already in use");}

    error = await user_service.dniExist(user.dni);
    if (error) {logger.info("DNI already in use"); return res.status(400).send("DNI already in use");}

    user.isAdmin = false; // Default Admin privileges is false
    const result = await user_service.createUser(user);
    const token = user_service.generateAuthToken(result);
    res.header('x-auth-token', token).send(_.pick(result, ['id', 'name', 'surname', 'email']));
});

module.exports = router;