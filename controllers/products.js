const Sequelize = require('sequelize');
// var Product = require('../_models/product.js');

const sequelize = new Sequelize({
    database: 'shop',
    username: 'root',
    password: null,
    dialect: 'mysql',
    host: "localhost",
    port: 3306,
});

const Product = sequelize.define('products', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    name: Sequelize.STRING,
    description: Sequelize.STRING,
    price: Sequelize.DECIMAL
})

exports.getProduct = function(req, res, next) {
   
    Product.findAll().then(products => {
        res.json(products);
    });
}