'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    productName: DataTypes.STRING,
    originalPrice: DataTypes.INTEGER,
    priceAfterConversion: DataTypes.INTEGER,
    preOrderFee : DataTypes.INTEGER,
    sellingPrice    : DataTypes.INTEGER,
    whereToBuy  : DataTypes.STRING(1234),
    notes : DataTypes.STRING(1234),
    image: DataTypes.STRING,
    rate: DataTypes.INTEGER,
    isActive: DataTypes.ENUM,
  }, {});
  Product.associate = function(models) {
    // associations can be defined here
    Products.belongsToMany(models.Orders, {through: 'OrderDetails'});
  };
  return Product;
};