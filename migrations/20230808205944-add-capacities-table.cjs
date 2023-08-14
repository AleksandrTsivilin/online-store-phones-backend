'use strict';

const TABLE_NAME = 'capacities';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      TABLE_NAME, {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        capacity: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable(TABLE_NAME);
  }
};
