'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */

    return queryInterface.addColumn(
      'Products',
      'categoryId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Categories',
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      }
    ).then(() => {
      return queryInterface.addColumn(
        'Orders', // name of Source model
        'customerId', // name of the key we're adding 
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Customers', // name of Target model
            key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      );
    });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */

   return queryInterface.removeColumn(
    'Products', // name of Source model
    'categoryId' // key we want to remove
  ).then(() => {
    return queryInterface.removeColumn(
      'Orders', // name of Source model
      'customerId' // key we want to remove
    )
  });
  }
};
