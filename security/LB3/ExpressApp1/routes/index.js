'use strict';
var express = require('express');
var router = express.Router();

/* GET home page. */
/*router.get('/', function (req, res) {
    res.render('index', { title: 'Express' });
});*/

/* GET home page. */
router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/html', 'index.html'))
    res.end()
});

module.exports = router;
