'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Customers', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            customerName: {
                type: Sequelize.STRING
            },
            phoneNumber: {
                type: Sequelize.STRING,
                allowNull: true,
                unique: true,
                validate: {
                    len: {
                        args: [7, 20],
                        msg: "Phone number invalid, too short."
                    },
                    isNumeric: {
                        msg: "not a valid phone number."
                    }
                }
            },
            whatsapp: {
                type: Sequelize.ENUM,
                values: ['Yes', 'No'],
            },
            line: {
                type: Sequelize.ENUM,
                values: ['Yes', 'No'],
            },
            lineId: {
                type: Sequelize.STRING,
            },
            address: {
                type: Sequelize.STRING,
                allowNull: false,
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
        return queryInterface.dropTable('Customers');
    }
};