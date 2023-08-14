'use strict';

const namespacesCapacities = require('./20230804162913-add-namespacesCapacities-data.json');
const TABLE_NAME = 'namespacesCapacities';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      TABLE_NAME,
      namespacesCapacities,
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      TABLE_NAME,
      {},
    );
  }
};
