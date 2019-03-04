var response = require('./res');
var connection = require('../config/con');
const _ = require('lodash');
const { Product, Category, sequelize } = require('../models');
const { Op } = sequelize;

// - get by product name, using like
exports.search = async (req, res) => {
    const { name } = req.params;
    const product = await Product.findAll({
        where: {
            productName: {
                [Op.like]: `%${name}%`
            }   
        }
    });

    response.ok(product, res);
};

exports.products = async (req, res) => {
    const products = await Product.findAll({
        include: {
            model: Category,
            as: 'category'
        }
    });
    response.ok(products, res);
};

exports.findProduct = async (req, res) => {
    const productId = req.params.productId;
    const product = await Product.findByPk(productId);
    if (_.isEmpty(product)) {
        response.error({
            message: `product id: ${productId} not found!`
        }, res);
    }
    response.ok(product, res);
    // const queryTotalCustomer = 'SELECT COUNT(orderId) as totalCustomer FROM OrderDetails WHERE productId = ?';
    // connection.query('SELECT * FROM Products WHERE id = ?',
    // [productId],
    // (error, rows, fields) => {
    //     if(error) {
    //         console.log(error);
    //     } else {
    //         if(rows.length > 0){
    //           _.map(rows, (row, i) => {
    //               connection.query(queryTotalCustomer, [productId], 
    //                 (error, customerRows, fields) => {
    //                     if (error) {
    //                         console.log(error);
    //                     } else {
    //                         row.totalCustomer = customerRows;
    //                         console.log(row);
    //                         response.ok(rows, res)
    //                     }
    //                 })
    //           })
    //         }
    //     }
    // }
    // )
}

exports.createProduct = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        // - get params
        const data = req.body;
        const result = await Product.create(data, { transaction });
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