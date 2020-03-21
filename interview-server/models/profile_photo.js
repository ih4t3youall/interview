'use strict';
module.exports = (sequelize, DataTypes) => {
  const Profile_Photo = sequelize.define('Profile_Photo', {
    profile_id: DataTypes.INTEGER,
    path: DataTypes.TEXT
  }, {});
  return Profile_Photo;
};