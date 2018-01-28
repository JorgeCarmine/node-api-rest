var express = require('express');
var router = express.Router();
var validations = require('../lib/validations');
var usersController = require('../controllers/users');

/* GET users listing. */
router.route('/')
  .get(validations.AUTH, usersController.getUsers)
  .post(usersController.create);

router.route('/:param')
  .get(usersController.getUser)
  .put(usersController.updateUser)
  .delete(usersController.deleteUser);

module.exports = router;
