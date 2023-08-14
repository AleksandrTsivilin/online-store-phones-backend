'use strict';

const products = require('./20230808212306-add-products-data.json');
const TABLE_NAME = 'products';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      TABLE_NAME,
      products,
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      TABLE_NAME,
      {},
    );
  }
};
