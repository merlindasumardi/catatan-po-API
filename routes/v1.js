
'use strict';

module.exports = function(app) {
    var product = require('../controllers/productController');
    var customer = require('../controllers/customerController');
    var order = require('../controllers/orderController');

    app.route('/')
    .get(product.index);

    app.route('/products')
    .get(product.products);

    app.route('/products/:productId')
    .get(product.findProduct);

    app.route('/add-product')
    .post(product.createProduct);

    app.route('/edit-product/:productId')
    .put(product.updateProduct);

    app.route('/delete-product/:productId')
    .put(product.deleteProduct);

    app.route('/customers')
    .get(customer.customers);

    app.route('/add-customer')
    .post(customer.createCustomer);

    app.route('/edit-customer/:customerId')
    .put(customer.updateCustomer);

    app.route('/delete-customer/:customerId')
    .put(customer.deleteCustomer);

    app.route('/get-order/:customerId')
    .get(order.getAllOrderByCustomer);

    app.route('/create-order')
    .post(order.createOrder);
};