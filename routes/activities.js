var express = require('express');
var router = express.Router();
var activitiesController = require('../controllers/activities')

/* GET users listing. */
router.get('/', activitiesController.getActivity);

module.exports = router;
