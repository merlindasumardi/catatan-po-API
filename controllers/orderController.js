var response = require('./res');
var connection = require('../config/con');
const _ = require('lodash');
const {
    Customer,
    Orders,
    OrderDetails,
    sequelize
} = require('../models');

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
    const transaction = await sequelize.transaction();
    // - get request body
    const orderData = req.body.orderData;
    const orderDetailData = req.body.orderDetail
    try {
        // - find customer_id
        const { customerId } = orderData;
        const customer = await Customer.findByPk(customerId, { transaction });
        if (_.isEmpty(customer)) {
            transaction.rollback();
            response.error({
                message: `customer with id ${customerId} not found!`
            }, res);
        }
        // - create order
        const order = await Orders.create(orderData, { transaction });

        // - create order detail
        // const willInsertData = _
        //     .chain(orderDetailData)
        //     .map()
        const orderDetail = await OrderDetails.bulkCreate(orderDetailData, { transaction });

        // - commit transaction
        transaction.commit();
        response.ok({
            order,
            orderDetail
        }, res);
    } catch (err) {
        console.log(err);
        transaction.rollback();
        response.error(err, res);
    }
}