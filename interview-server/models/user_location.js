'use strict';
module.exports = (sequelize, DataTypes) => {
  const User_Location = sequelize.define('User_Location', {
    location: DataTypes.GEOMETRY('POINT'),
    user_id: DataTypes.INTEGER
  }, {});
  return User_Location;
};