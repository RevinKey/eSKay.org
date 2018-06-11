var express = require('express');
var pictures = require('./pictures');
var artists = require('./artists');


var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', {
		pictures: pictures,
		artists: artists,
		myPartial: () => 'home'
	});
});

module.exports = router;
