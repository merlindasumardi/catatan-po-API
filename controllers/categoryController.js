const _ = require('lodash');
const { Category } = require('../models');
const response = require('./res');

module.exports = {
    // - list all category
    async list(req, res) {
        const categories = await Category.findAll();
        return response.ok(categories, res);
    },

    // - get category based on id
    async get(req, res) {
        // - get params
        const { id } = req.params;
        const category = await Category.findByPk(id);
        // - validate category not found
        if (_.isEmpty(category)) {
            response.error({
                message: `category with id: ${id} not found!`
            }, res);
        }
        // - response category
        response.ok(category, res);
    }
};
