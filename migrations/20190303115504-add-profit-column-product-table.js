module.exports = {
    up: (queryInterface, Sequelize) => {
        const p1 = queryInterface.addColumn('Products', 'profit', Sequelize.FLOAT(16, 2));
        return p1;
    },

    down: (queryInterface) => {
        const p1 = queryInterface.removeColumn('Products', 'profit');
        return p1;
    }
};
