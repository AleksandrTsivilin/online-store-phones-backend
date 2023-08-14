'use strict';

const namespaces = require('./20230802134640-add-namespaces-data.json');
const TABLE_NAME = 'namespaces';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      TABLE_NAME,
      namespaces,
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      TABLE_NAME,
      {},
    );
  }
};
