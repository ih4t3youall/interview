'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sighting = sequelize.define('Sighting', {
    location: DataTypes.GEOMETRY('POINT'),
    alert_id: DataTypes.INTEGER,
    created_by: DataTypes.INTEGER
  }, {});
  return Sighting;
};