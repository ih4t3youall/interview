'use strict';
module.exports = (sequelize, DataTypes) => {
  const Alert_Photo = sequelize.define('Alert_Photo', {
    alert_id: DataTypes.INTEGER,
    path: DataTypes.TEXT
  }, {});
  return Alert_Photo;
};