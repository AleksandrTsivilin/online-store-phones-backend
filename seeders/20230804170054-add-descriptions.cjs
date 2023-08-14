'use strict';

const descriptions = require('./20230804170054-add-descriptions-data.json');
const TABLE_NAME = 'descriptions';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      TABLE_NAME,
      descriptions,
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      TABLE_NAME,
      {},
    );
  }
};
