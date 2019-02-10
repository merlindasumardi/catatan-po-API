'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      downPayment: {
        type: Sequelize.ENUM,
        values: ['Yes', 'No'],
      },
      amountOfDP: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      paid: {
        type: Sequelize.ENUM,
        values: ['Yes', 'No'],
      },
      totalPrice: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: 'CURRENT_TIMESTAMP',

      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: 'CURRENT_TIMESTAMP',

      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Orders');
  }
};