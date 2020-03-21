'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Alert_Comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      alert_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Alerts',
          key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      comment: {
        allowNull: false,
        type: Sequelize.TEXT,
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
    return queryInterface.dropTable('Alert_Comments');
  }
};