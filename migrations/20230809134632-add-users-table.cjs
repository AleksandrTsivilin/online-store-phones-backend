'use strict';

const TABLE_NAME = 'users';

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
        email: {
          type: Sequelize.STRING,
          unique: true,
          allowNull: false,
        },
        firstName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        lastName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        hashPassword: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        role: {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: 'user',
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
