'use strict';
module.exports = (sequelize, DataTypes) => {
  const Alert = sequelize.define('Alert', {
    owner: DataTypes.INTEGER,
    location: DataTypes.GEOMETRY('POINT'),
    description: DataTypes.TEXT,
    type: DataTypes.ENUM('PERSON', 'CAR', 'MOTORCYCLE'),
    type_of_theft: DataTypes.STRING,
    licence_plate: DataTypes.STRING,
    found: DataTypes.BOOLEAN,
    found_time: DataTypes.DATE
  }, {});
  return Alert;
};