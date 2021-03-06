var express = require('express');
var router = express.Router();
var loginController = require('../controllers/login')

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

router.post('/login', loginController.login);

module.exports = router;
