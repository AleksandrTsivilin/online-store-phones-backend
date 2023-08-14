'use strict';

const TABLE_NAME = 'details';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      TABLE_NAME,
      {
        id: {
          type: Sequelize.STRING,
          primaryKey: true,
          allowNull: false,
        },
        resolution: {
          type: Sequelize.STRING,
        },
        processor: {
          type: Sequelize.STRING,
        },
        camera: {
          type: Sequelize.STRING,
        },
        zoom: {
          type: Sequelize.STRING,
        },
        cell: {
          type: Sequelize.ARRAY(Sequelize.STRING),
        },
        namespaceId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'namespaces',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'RESTRICT',
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
