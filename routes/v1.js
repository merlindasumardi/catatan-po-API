module.exports = function (app) {
    var product = require('../controllers/productController');
    var customer = require('../controllers/customerController');
    var order = require('../controllers/orderController');

    // - product route
    app.route('/')
        .get(product.index);

    app.route('/products')
        .get(product.products);

    app.route('/products/:productId')
        .get(product.findProduct);

    app.route('/products')
        .post(product.createProduct);

    app.route('/products/:productId')
        .put(product.updateProduct);

    app.route('/products/:productId')
        .delete(product.deleteProduct);

    // - customer routes
    app.route('/customers')
        .get(customer.customers);

    app.route('/customers')
        .post(customer.createCustomer);

    app.route('/customers/:customerId')
        .put(customer.updateCustomer);

    app.route('/customers/:customerId')
        .delete(customer.deleteCustomer);

    // - order routes
    app.route('/orders/:customerId')
        .get(order.getAllOrderByCustomer);

    app.route('/orders')
        .post(order.createOrder);
};