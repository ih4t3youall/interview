'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.addColumn(
        'User_Profiles',
        'title',
        Sequelize.STRING
    );

  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.removeColumn(
        'User_Profiles',
        'title'
    );
  }
}