var response = require('./res');
var connection = require('../config/con');
const _ = require('lodash');
const { Product, Category } = require('../models');

exports.products = async (req, res) => {
    const products = await Product.findAll({
        include: {
            model: Category,
            as: 'category'
        }
    });
    response.ok(products, res);
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

exports.createProduct = (req, res) => {
    console.log(req.body);
    const data = req.body;
    const queryAddProduct = 'INSERT INTO Products SET ?';
    connection.query(queryAddProduct, [data], (error, rows) => {
        if(error) {
            console.log(error);
        } else {
            response.ok(rows, res);
        }
    })
}

exports.updateProduct = (req, res) => {
    const productData = req.body;
    const productId = req.params.productId;
    connection.query('UPDATE Products SET ? WHERE id = ?', [productData, productId], (error, rows) => {
        if(error) {
            console.log(error);
        } else {
            response.ok(rows, res);
        }
    })
}

exports.deleteProduct = (req, res) => {
    const productId = req.params.productId;
    connection.query('UPDATE Products SET isActive="no" WHERE id=?', [productId], (error, rows) => {
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