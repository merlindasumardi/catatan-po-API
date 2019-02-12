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

    Orders.associate = function (models) {
        Orders.belongsTo(models.Customer, {
            as: 'customer',
            foreignKey: 'customerId'
        });
        // associations can be defined here
        Orders.hasMany(models.OrderDetails, {
            as: 'orderDetails'
        })
    };
    return Orders;
};