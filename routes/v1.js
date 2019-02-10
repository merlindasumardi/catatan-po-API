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

    app.route('/add-customer')
        .post(customer.createCustomer);

    app.route('/edit-customer/:customerId')
        .put(customer.updateCustomer);

    app.route('/delete-customer/:customerId')
        .put(customer.deleteCustomer);

    // - order routes
    app.route('/get-order/:customerId')
        .get(order.getAllOrderByCustomer);

    app.route('/create-order')
        .post(order.createOrder);
};