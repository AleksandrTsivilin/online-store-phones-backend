'use strict';

const TABLE_NAME = 'products';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      TABLE_NAME,
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        fullPrice: {
          type: Sequelize.FLOAT,
          allowNull: false,
        },
        price: {
          type: Sequelize.FLOAT,
          allowNull: false,
        },
        screen: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        capacity: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        ram: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        year: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        image: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        categoryId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'categories',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'RESTRICT',
        },
        colorId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'colors',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'RESTRICT',
        },
        detailId: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
          references: {
            model: 'details',
            key: 'id'
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
