'use strict';
module.exports = (sequelize, DataTypes) => {
  const Received_Alert = sequelize.define('Received_Alert', {
    user_id: DataTypes.INTEGER,
    alert_id: DataTypes.INTEGER,
    involved: DataTypes.BOOLEAN,
  }, {});
  return Received_Alert;
};