'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.addColumn(
        'Sightings',
        'created_by',
        Sequelize.INTEGER
    );

  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.removeColumn(
        'Sightings',
        'created_by'
    );
  }
}