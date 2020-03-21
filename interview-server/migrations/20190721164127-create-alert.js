'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Alerts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      owner: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      location: {
        type: Sequelize.GEOMETRY('POINT'),
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      type: {
        type: Sequelize.ENUM('PERSON', 'CAR', 'MOTORCYCLE'),
        allowNull: false
      },
      type_of_theft: {
        type: Sequelize.STRING,
        allowNull: false
      },
      licence_plate: {
        type: Sequelize.STRING,
        allowNull: true
      },
      found: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
      found_time: {
        type: Sequelize.DATE,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Alerts');
  }
};