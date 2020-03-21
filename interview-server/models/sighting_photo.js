'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sighting_Photo = sequelize.define('Sighting_Photo', {
    sighting_id: DataTypes.INTEGER,
    path: DataTypes.TEXT
  }, {});
  return Sighting_Photo;
};