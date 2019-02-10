'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        const p1 = queryInterface.addColumn('Customers', 'isActive', {
            type: Sequelize.ENUM,
            values: ['Yes', 'No']
        });
        return p1;
    },

    down: (queryInterface, Sequelize) => {
        const p1 = queryInterface.removeColumn('Customers', 'isActive');
        return p1;
    }
};
