const { Customer } = require('../models');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        /*
          Add altering commands here.
          Return a promise to correctly handle asynchronicity.
    
          Example:
          return queryInterface.bulkInsert('People', [{
            name: 'John Doe',
            isBetaMember: false
          }], {});
        */

        const customer = await Customer.findOne({
            where: {
                customerName: 'Merlinda'
            }
        });

        return queryInterface.bulkInsert('Orders', [{
            downPayment: 'Yes',
            amountOfDP: 200000,
            paid: 'No',
            customerId: customer.id,
            totalPrice: 400000,
            updatedAt: new Date(),
            createdAt: new Date(),
        }], {});
    },

    down: (queryInterface, Sequelize) => {
        /*
          Add reverting commands here.
          Return a promise to correctly handle asynchronicity.
    
          Example:
          return queryInterface.bulkDelete('People', null, {});
        */

        return queryInterface.bulkDelete('Orders', null, {});
    }
};
