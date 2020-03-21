'use strict';

// Sequelize Model definition
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    surname: DataTypes.STRING,
    email: DataTypes.STRING,
    dni: DataTypes.STRING,
    password: DataTypes.STRING,
    language: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN
  }, {});
  return User;
};