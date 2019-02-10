module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        productName: DataTypes.STRING,
        originalPrice: DataTypes.INTEGER,
        priceAfterConversion: DataTypes.INTEGER,
        preOrderFee: DataTypes.INTEGER,
        sellingPrice: DataTypes.INTEGER,
        whereToBuy: DataTypes.STRING(1234),
        notes: DataTypes.STRING(1234),
        image: DataTypes.STRING,
        rate: DataTypes.INTEGER,
        isActive: {
            type:  DataTypes.ENUM,
            values: ['yes', 'no']
        },
        categoryId: DataTypes.INTEGER
    }, {});

    Product.associate = function (models) {
        // associations can be defined here
        // Products.BelongsToMany(models.Orders, { through: 'OrderDetails' });
        // - belongs to category
        Product.belongsTo(models.Category, {
            as: 'category',
            foreignKey: 'categoryId'
        })
    };
    return Product;
};