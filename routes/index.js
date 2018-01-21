var express = require('express');
var router = express.Router();
var validateLeters = require('../lib/onli-text');
var productsController = require('../controllers/products.js');
var usersController = require('../controllers/users');

/* GET home page. */
router.get('/', function(req, res, next) {
  var user = req.session.user
  console.log(user);
  
  if (user) {
    res.render('index', { title: 'Inicio', user: user });    
  } else {
    res.redirect('/login');
  }
});

router.get('/login', function(req, res, next) {
  var json = {title: 'Login', wellcome: '¡Bienvenido papu!'};
  res.render('login/login', json);
});

router.post('/login',
  function (req, res, next) {
    let email = req.body.email;
    let password = req.body.password;
    let errors = [];

    if (!validateLeters(email)) {
      errors.push({message: 'El usuario solo debe contener letras'})
    }
    if (email.length < 1) {
      errors.push({ message: 'El unusario no puede estar vacio' })
    }
    if (password.length < 6) {
      errors.push({ message: 'La contraseña no puede estar vacia' })      
    }
    if (errors.length) {
      let json = {
        errors: errors,
        user: { email: email, password: password }
      }
      console.log(json);
      
      return res.render('login/login', json);
    }
    next();
  },
  function(req, res, next) {
    let email = req.body.email;
    let password = req.body.password;
    if (email != 'Jorge') {
      req.flash('error_message', 'Usuario o contraseña son incorrectos');
      console.log(req.flash('error_message')[0]);
      return res.redirect('/login');
    }
    res.locals.user = { email: email, password: password }
    next();
  },
  function (req, res, next) {
    req.session.user = res.locals.user;
    res.redirect('/');
});

router.get('/logout', function (req, res, next) {
  req.session.user = undefined;
  res.redirect('/login');
});

router.get('/products', productsController.getProduct);

router.get('/users', usersController.getUsers)

module.exports = router;
