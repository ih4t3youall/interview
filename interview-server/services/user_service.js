const config = require('config');
const userDAO  = require('../dao/userDAO');
const jwt = require('jsonwebtoken');
const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');
const PasswordComplexity = require('joi-password-complexity');
const util = require('util');

const complexityOptions = {
    min: 6,
    max: 30,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 0,
    requirementCount: 1,
};

const schema = {
    id: Joi.number(),
    name: Joi.string().min(5).max(50).required(),
    surname: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    dni: Joi.string().length(8).required(),
    language: Joi.string().length(2).required(),
    password: new PasswordComplexity(complexityOptions).required(),
    isAdmin: Joi.boolean()
};

module.exports.getSchema = function getSchema(){
    return util.inspect(schema, {'depth':0});
};

module.exports.validateUser = function validateUser(user) {
    return Joi.validate(user, schema);
};

module.exports.validatePassword = function validatePassword(password) {
    return Joi.validate(password, {password: new PasswordComplexity(complexityOptions).required()});
};

module.exports.generateAuthToken = function generateAuthToken(user) {
    const privateKey = config.get('jwtPrivateKey');
    const token = jwt.sign({id: user.id, isAdmin: user.isAdmin}, privateKey);
    return token;
};


module.exports.createUser = async function createUser(user) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    user.language = user.language.toUpperCase(); // UpperCase the language
    return await userDAO.createUser(user);
};


module.exports.updateUser = async function updateUser(user_id, user) {
    const options = {
        where: {
            "id" : user_id
        }
    };
    return await userDAO.updateUser(user, options);
};

module.exports.updateUserPassword = async function updateUserPassword(user_id, password) {
    const options = {
        where: {
            "id" : user_id
        }
    };
    const salt = await bcrypt.genSalt(10);
    password.password = await bcrypt.hash(password.password, salt);
    return await userDAO.updateUser(password, options);
};

module.exports.deleteUserByID = async function deleteUserByID(user_id) {
    const options = {
        raw: true,
        where: {
            "id" : user_id
        }
    };
    return await userDAO.deleteUser(options);
};

module.exports.findUserByEmail = async function findUserByEmail(email) {
    const where = {
        raw: true,
        where: {
            "email" : email
        }
    };
    const user = await userDAO.findUser(where);
    if (user.length > 0) {
        return user[0]
    } else {
        return false;
    }
};

module.exports.findUserById = async function findUserById(id) {
    const where = {
        raw: true,
        where: {
            "id" : id
        }
    };
    const user = await userDAO.findUser(where);
    if (user.length > 0) {
        return user[0];
    } else {
        return false;
    }
};

module.exports.findAll = async function findAll() {
    const where = {
        raw: true,
        where: {}
    };
    return await userDAO.findUser(where);
};

module.exports.emailExist = async function emailExist(email) {
    const where = {
        raw: true,
        where: {
            "email" : email
        }
    };
    const result =  await userDAO.findUser(where);
    return result.length > 0;
};

module.exports.dniExist = async function dniExist(dni) {
    const where = {
        raw: true,
        where: {
            "dni" : dni
        }
    };
    const result = await userDAO.findUser(where);
    return result.length > 0;
};

module.exports.getUserCount = async function getUserCount() {
    const result = await userDAO.userCount();
    return result.count;
};
