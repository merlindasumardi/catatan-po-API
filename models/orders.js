module.exports = (sequelize, DataTypes) => {
    const Orders = sequelize.define('Orders', {
        amountOfDP: DataTypes.INTEGER,
        customerId: DataTypes.INTEGER,
        downPayment: {
            type: DataTypes.ENUM,
            values: ['yes', 'no']
        },
        paid: {
            type: DataTypes.ENUM,
            values: ['yes', 'no']
        },
        totalPrice: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    }, {});
    // Order.associate = function (models) {
    //     // Orders.belongsTo(models.Customer);
    //     // Orders.belongsToMany(models.Products, {through: 'OrderDetails'});
    //     // associations can be defined here
    // };
    return Orders;
};