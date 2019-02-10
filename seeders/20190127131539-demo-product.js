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

   return queryInterface.bulkInsert('Products', [{
    productName: 'Orihiro Night Diet Tea',
    originalPrice: 980,
    priceAfterConversion: 132300,
    preOrderFee : 20000,
    sellingPrice    : 152300,
    whereToBuy  : 'Drugstore',
    notes : 'belum pasti fee nya',
    image: 'testing',
    categoryId: 1,
    rate: 135,
    isActive: 'yes',
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */

   return queryInterface.bulkDelete('Products', null, {});
  }
};
