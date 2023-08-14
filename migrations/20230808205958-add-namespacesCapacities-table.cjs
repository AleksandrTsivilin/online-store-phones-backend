'use strict';

const TABLE_NAME = 'namespacesCapacities';

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
        namespaceId: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: 'namespaces',
            key: 'id',
          },
          onDelete: 'SET NULL',
        },
        capacityId: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: {
            model: 'capacities',
            key: 'id',
          },
          onDelete: 'SET NULL',
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
