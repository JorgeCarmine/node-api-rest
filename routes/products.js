var express = require('express');
var router = express.Router();
var productsController = require('../controllers/products.js')

/* GET users listing. */
router.get('/', productsController.getProduct);

module.exports = router;
