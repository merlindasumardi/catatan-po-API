'use strict';

var response = require('./res');
var connection = require('../config/con');
const _ = require('lodash');

exports.getAllOrderByCustomer = (req, res) => {
    const customerId = req.params.customerId;
    const getOrderQuery = `SELECT *, od.id as orderDetailId
    FROM OrderDetails od JOIN Products p ON p.id = od.id JOIN Orders o ON od.orderId = o.id
    WHERE orderId IN  (SELECT id FROM Orders WHERE customerId=? )`;
    connection.query(getOrderQuery, [customerId], (error, rows, fields) => {
        if(error) {
            response.error(error, res);
        } else{
            response.ok(rows, res);
        }
    });
}

exports.createOrder = async (req, res) => {
    const orderData = req.body.orderData;
    const orderDetailData = req.body.orderDetail
    
    await connection.query('UPDATE Orders SET ? WHERE orderId=?', [orderData, orderData.orderId], (error, rows) => {
        if(error) {
            response.error(error, res);
        } else{
            console.log(rows);
            response.ok(rows, res);
            
        }
    });
    await connection.query('INSERT INTO OrderDetails SET ?', [orderDetailData], (error, rows) => {
        if(error) {
            response.error(error, res);
        } else{
            console.log('order detail');
            response.ok(rows, res);
        }
    });
    

}