'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        /*
          Add altering commands here.
          Return a promise to correctly handle asynchronicity.
    
          Example:
          return queryInterface.bulkInsert('People', [{
            name: 'John Doe',
            isBetaMember: false
          }], {});
        */

        return queryInterface.bulkInsert('Categories', [{
            categoryName: 'Cosmetic',
            updatedAt: new Date(),
            createdAt: new Date(),
        },
        {
            categoryName: 'Snacks',
            updatedAt: new Date(),
            createdAt: new Date(),
        },
        {
            categoryName: 'Bags',
            updatedAt: new Date(),
            createdAt: new Date(),
        },
        {
            categoryName: 'Apparel',
            updatedAt: new Date(),
            createdAt: new Date(),
        },
        {
            categoryName: 'Others',
            updatedAt: new Date(),
            createdAt: new Date(),
        },
        ])
    },

    down: (queryInterface, Sequelize) => {
        /*
          Add reverting commands here.
          Return a promise to correctly handle asynchronicity.
    
          Example:
          return queryInterface.bulkDelete('People', null, {});
        */

        return queryInterface.bulkDelete('Categories', null, {});
    }
};
