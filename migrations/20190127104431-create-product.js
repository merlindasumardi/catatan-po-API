'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Products', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            productName: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            originalPrice: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            priceAfterConversion: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            preOrderFee: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            sellingPrice: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            whereToBuy: {
                type: Sequelize.STRING(1234),
                allowNull: true,
            },
            notes: {
                type: Sequelize.STRING(1234),
                allowNull: true,
            },
            image: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            rate: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 135,
            },
            isActive: {
                type: Sequelize.ENUM,
                values: ['yes', 'no'],
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),

            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),

            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Products');
    }
};