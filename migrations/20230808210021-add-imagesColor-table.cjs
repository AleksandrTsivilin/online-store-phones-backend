'use strict';

const TABLE_NAME = 'imagesColor';

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
        imagePath: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        namespaceId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'namespaces',
            key: 'id',
          },
          onDelete: 'CASCADE',
        },
        colorId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'colors',
            key: 'id',
          },
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
