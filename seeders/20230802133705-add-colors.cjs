'use strict';

const colors = require('./20230802133705-add-colors-data.json');
const TABLE_NAME = 'colors';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      TABLE_NAME,
      colors,
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      TABLE_NAME,
      {},
    );
  }
};
