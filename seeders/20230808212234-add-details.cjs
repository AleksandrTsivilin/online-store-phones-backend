'use strict';

const details = require('./20230808212234-add-details-data.json');
const TABLE_NAME = 'details';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      TABLE_NAME,
      details,
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      TABLE_NAME,
      {},
    );
  }
};
