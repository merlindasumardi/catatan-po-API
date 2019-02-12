module.exports = (sequelize, DataTypes) => {
    const OrderDetails = sequelize.define('OrderDetails', {
        productId: DataTypes.INTEGER,
        orderId: DataTypes.INTEGER,
        amount: DataTypes.INTEGER,
        price: DataTypes.INTEGER
    }, {});

    OrderDetails.associate = function (models) {
        OrderDetails.belongsTo(models.Product, {
            as: 'product'
        });
    };
    return OrderDetails;
};