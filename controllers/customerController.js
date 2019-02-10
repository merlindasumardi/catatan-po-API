'use strict';

var response = require('./res');
var connection = require('../config/con');
const _ = require('lodash');

exports.customers = function(req, res) {
    connection.query('SELECT * FROM Customers', function (error, rows, fields){
        if(error){
            response.error(error, res)
        } else{
            response.ok(rows, res)
        }
    });
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

exports.createCustomer = (req, res) => {
    const data = req.body;
    connection.query('INSERT INTO Customers SET ?', [data], (error, rows) => {
        if(error) {
            response.error(error, res)
        } else {
            response.ok(rows, res);
        }
    })
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

exports.deleteCustomer = (req, res) => {
    const customerId = req.params.customerId;
    connection.query('UPDATE Customers SET isActive="no" WHERE id=?', [customerId], (error, rows) => {
        if(error) {
            response.error(error, res);
        } else{
            response.ok(rows, res);
        }
    })
}

exports.index = function(req, res) {
    response.ok("Hello from the Node JS RESTful side!", res)
};