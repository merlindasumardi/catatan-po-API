module.exports = {
    up: (queryInterface, Sequelize) => {
        const p1 = queryInterface.removeColumn('OrderDetails', 'weight');
        const p2 = queryInterface.addColumn('Products', 'weight', Sequelize.INTEGER);
        return Promise.all([p1, p2]);
    },

    down: (queryInterface, Sequelize) => {
        const p1 = queryInterface.addColumn('OrderDetails', 'weight', Sequelize.STRING);
        const p2 = queryInterface.removeColumn('Products', 'weight');
        return Promise.all([p1, p2]);
    }
};
