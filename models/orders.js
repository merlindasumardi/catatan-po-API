'use strict';
module.exports = (sequelize, DataTypes) => {
  const Orders = sequelize.define('Orders', {
    downPayment: DataTypes.ENUM,
    amountOfDP: DataTypes.INTEGER,
    paid: DataTypes.ENUM,
    totalPrice: DataTypes.INTEGER,
  }, {});
  Orders.associate = function(models) {
    Orders.belongsTo(models.Customer);
    Orders.belongsToMany(models.Products, {through: 'OrderDetails'});
    // associations can be defined here
  };
  return Orders;
};