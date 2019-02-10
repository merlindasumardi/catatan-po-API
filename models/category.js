'use strict';
module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
        categoryName: DataTypes.STRING
    }, {});
    Category.associate = function (models) {
        // associations can be defined here
        // Category.HasOne(models.Product);
    };
    return Category;
};