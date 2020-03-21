'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.addColumn(
        'Alerts',
        'notified_count',
        Sequelize.INTEGER
    );

  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.removeColumn(
        'Alerts',
        'notified_count'
    );
  }
}