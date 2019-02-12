var response = require('./res');
var connection = require('../config/con');
const _ = require('lodash');
const {
    Customer,
    Orders,
    OrderDetails,
    Product,
    sequelize
} = require('../models');

exports.getAllOrderByCustomer = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const customerId = req.params.customerId;
        const orders = await Orders.findAll({
            where: {
                customerId
            },
            include: {
                model: OrderDetails,
                as: 'orderDetails',
                include: {
                    model: Product,
                    as: 'product'
                }
            }
        }, { transaction });


        await transaction.commit();

        response.ok({
            orders
        }, res);
    } catch (error) {
        await transaction.rollback();
        response.error({
            message: error.message
        }, res);
    }
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
        const amountofDP = _.get(orderData, 'amountOfDP');
        const downPayment = _.gt(amountofDP, 0) ? 'yes' : 'no';
        orderData.downPayment = downPayment;
        orderData.totalPrice = 0;
        const order = await Orders.create(orderData, { transaction });

        // - create order detail
        const orderDetail = await _orderDetail(orderDetailData, order, transaction);

        // - commit transaction
        await transaction.commit();
        response.ok({
            order,
            orderDetail
        }, res);
    } catch (err) {
        console.log(err);
        await transaction.rollback();
        response.error({
            message: err.message
        }, res);
    }
}

exports.updateOrder = async (req, res) => {
    const transaction = await sequelize.transaction();
    try {
        const orderId = req.params.orderId;
        const order = await Orders.findByPk(orderId, { transaction });
        if (_.isEmpty(order)) {
            response.error({
                message: `order with id: ${orderId} not found!`
            }, res);
        }

        // - update order
        const orderData = req.body.orderData;
        await order.update(orderData, { transaction });

        // - add order detail, if exist
        const orderDetailData = _.get(req, 'body.orderDetail');
        if (!_.isEmpty(orderDetailData)) {
            // - add new order detail
            await _orderDetail(orderDetailData, order, transaction);
        }

        // - commit
        await transaction.commit();

        response.ok({
            order
        }, res);
    } catch (err) {
        console.log(err);
        await transaction.rollback();
        response.error({
            message: err.message
        }, res);
    }
}

// - private function
_orderDetail = async (orderDetailData, order, transaction) => {
    // - create order detail
    const willInsertData = _
        .chain(orderDetailData)
        .map(el => _.extend({}, el, { orderId: order.id }))
        .value();
    const orderDetail = await OrderDetails.bulkCreate(willInsertData, { transaction });

    // - update order
    const total = willInsertData.reduce((acc, currVal) => {
        return acc + (currVal.amount * currVal.price);
    }, order.totalPrice);
    await order.update({
        totalPrice: total
    }, { transaction });

    return orderDetail;
}
