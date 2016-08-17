var express = require('express');
var main = require('../controllers/mainController');
var router = express.Router();

/* GET home page. */
router.get('/', main.index);
router.get('/pokemon', main.pokemon);

module.exports = router;
