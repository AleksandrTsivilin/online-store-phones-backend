'use strict';

const imagesColor = require('./20230804184801-add-imagesColor-data.json');
const TABLE_NAME = 'imagesColor';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      TABLE_NAME,
      imagesColor,
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      TABLE_NAME,
      {},
    );
  }
};
