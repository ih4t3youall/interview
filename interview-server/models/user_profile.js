'use strict';
module.exports = (sequelize, DataTypes) => {
  const User_Profile = sequelize.define('User_Profile', {
    user_id: DataTypes.INTEGER,
    type: DataTypes.ENUM('PERSON', 'CAR', 'MOTORCYCLE'),
    description: DataTypes.TEXT,
    licence_plate: DataTypes.STRING,
    title: DataTypes.STRING
  }, {});
  return User_Profile;
};