'use strict';

const TABLE_NAME = 'orderProducts';

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
        quantity: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 1,
          validate: {
            min: 1,
          },
        },
        productId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'products',
            key: 'id',
          },
          onDelete: 'CASCADE',
        },
        orderId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'orders',
            key: 'id',
          },
          onDelete: 'CASCADE',
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
