'use strict';
module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define('Customer', {
    customerName: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    whatsapp: DataTypes.ENUM,
    line: DataTypes.ENUM,
    lineId: DataTypes.STRING,
    address: DataTypes.STRING
  }, {});
  Customer.associate = function(models) {
    // associations can be defined here
  };
  return Customer;
};