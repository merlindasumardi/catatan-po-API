const response = require('./res');
const connection = require('../config/con');
const _ = require('lodash');
const { Customer, sequelize } = require('../models');

exports.customers = async function (req, res) {
    const customers = await Customer.findAll();
    response.ok(customers, res);
};

exports.findProduct = (req, res) => {
    const productId = req.params.productId;
    const queryTotalCustomer = 'SELECT COUNT(orderId) as totalCustomer FROM OrderDetails WHERE productId = ?';
    connection.query('SELECT * FROM Products WHERE id = ?',
    [productId],
    (error, rows, fields) => {
        if(error) {
            console.log(error);
        } else {
            if(rows.length > 0){
              _.map(rows, (row, i) => {
                  connection.query(queryTotalCustomer, [productId], 
                    (error, customerRows, fields) => {
                        if (error) {
                            console.log(error);
                        } else {
                            row.totalCustomer = customerRows;
                            console.log(row);
                            response.ok(rows, res)
                        }
                    })
              })
            }
        }
    }
    )
}

exports.createCustomer = async (req, res) => {
    // const data = req.body;
    // connection.query('INSERT INTO Customers SET ?', [data], (error, rows) => {
    //     if(error) {
    //         response.error(error, res)
    //     } else {
    //         response.ok(rows, res);
    //     }
    // })
    const transaction = await sequelize.transaction();
    try {
        // - get params
        const data = req.body;
        const result = await Customer.create(data, { transaction });
        await transaction.commit();
        response.ok(result, res);
    } catch (error) {
        console.log(error);
        await transaction.rollback();
        response.error({
            message: error
        }, res);
    }
}

exports.updateCustomer = (req, res) => {
    const customorData = req.body;
    const customerId = req.params.customerId;
    connection.query('UPDATE Customers SET ? WHERE id = ?', [customorData, customerId], (error, rows) => {
        if(error) {
            console.log(error);
        } else {
            response.ok(rows, res);
        }
    })
}

exports.deleteCustomer = async (req, res) => {
    // const { customerId } = req.params;
    // connection.query('UPDATE Customers SET isActive="no" WHERE id=?', [customerId], (error, rows) => {
    //     if(error) {
    //         response.error(error, res);
    //     } else{
    //         response.ok(rows, res);
    //     }
    // })

    const transaction = await sequelize.transaction();
        try {
            // - get params
            const { customerId } = req.params;
            const customer = await Customer.findByPk(customerId);
            if (_.isEmpty(customer)) {
                response.error({
                    message: `customer id: ${id} not found!`
                }, res);
            }
            await customer.destroy();
            await transaction.commit();
            response.ok({
                message: `success remove customer: ${customer.id}`
            }, res);
        } catch (error) {
            console.log(error);
            await transaction.rollback();
            response.error({
                message: error
            }, res);
        }
}

exports.index = function(req, res) {
    response.ok("Hello from the Node JS RESTful side!", res)
};