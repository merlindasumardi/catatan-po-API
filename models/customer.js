'use strict';
module.exports = (sequelize, DataTypes) => {
    const Customer = sequelize.define('Customer', {
        customerName: DataTypes.STRING,
        phoneNumber: DataTypes.STRING,
        whatsapp: {
            type: DataTypes.ENUM,
            values: ['Yes', 'No']
        },
        line: {
            type: DataTypes.ENUM,
            values: ['Yes', 'No']
        },
        lineId: DataTypes.STRING,
        address: DataTypes.STRING,
        isActive: {
            type: DataTypes.ENUM,
            values: ['Yes', 'No']
        }
    }, {});
    Customer.associate = function (models) {
        // associations can be defined here
    };
    return Customer;
};