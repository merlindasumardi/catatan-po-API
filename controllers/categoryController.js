const _ = require('lodash');
const { Category, sequelize } = require('../models');
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
    },

    // - add new category
    async create(req, res) {
        const transaction = await sequelize.transaction();
        try {
            // - get params
            const categoryData = req.body;
            const category = await Category.create(categoryData, { transaction });
            await transaction.commit();
            response.ok(category, res);
        } catch (error) {
            console.log(error);
            await transaction.rollback();
            response.error({
                message: error
            }, res);
        }
    },

    // - update category
    async update(req, res) {
        const transaction = await sequelize.transaction();
        try {
            // - get params
            const { id } = req.params;
            const category = await Category.findByPk(id);
            if (_.isEmpty(category)) {
                response.error({
                    message: `category id: ${id} not found!`
                }, res);
            }
            // - get body
            const categoryData = req.body;
            await category.update(categoryData, { transaction });
            await transaction.commit();
            const reloaded = await category.reload();
            response.ok(reloaded, res);
        } catch (error) {
            console.log(error);
            await transaction.rollback();
            response.error({
                message: error
            }, res);
        }
    },

    // - delete category
    async delete(req, res) {
        const transaction = await sequelize.transaction();
        try {
            // - get params
            const { id } = req.params;
            const category = await Category.findByPk(id);
            if (_.isEmpty(category)) {
                response.error({
                    message: `category id: ${id} not found!`
                }, res);
            }
            await category.destroy();
            await transaction.commit();
            response.ok({
                message: `success remove category: ${category.id}, name: ${category.categoryName}`
            }, res);
        } catch (error) {
            console.log(error);
            await transaction.rollback();
            response.error({
                message: error
            }, res);
        }
    }
};
