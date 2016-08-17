var express = require('express');
var main = require('../controllers/mainController');
var router = express.Router();

/* GET home page. */
router.get('/', main.index);

module.exports = router;
