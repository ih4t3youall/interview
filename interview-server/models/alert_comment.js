'use strict';
module.exports = (sequelize, DataTypes) => {
  const Alert_Comment = sequelize.define('Alert_Comment', {
    alert_id: DataTypes.INTEGER,
    comment: DataTypes.TEXT
  }, {});
  return Alert_Comment;
};