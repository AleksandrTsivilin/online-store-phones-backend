'use strict';

const capacities = require('./20230804154627-add-capacities-data.json');
const TABLE_NAME = 'capacities';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      TABLE_NAME,
      capacities,
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      TABLE_NAME,
      {},
    );
  }
};
