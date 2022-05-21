'use strict';

var utils = require('../utils/writer.js');
var Vhash = require('../service/VhashService');

module.exports.vhashPOST = function vhashPOST (req, res, next) {
  Vhash.vhashPOST(req)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
