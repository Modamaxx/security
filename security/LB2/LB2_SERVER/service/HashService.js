'use strict';


/**
 * Returns hash
 *
 * no response value expected for this operation
 **/
const crypto = require('crypto');

exports.hashPOST = function(req) {
  return new Promise(function(resolve, reject) {

  var data = req.body.data;
  var hash = crypto.createHash("sha256").update(data, "utf-8").digest("hex")

  var response = {};
  response['application/json'] = { "hash": hash };

  if (Object.keys(response).length > 0) {
    resolve(response[Object.keys(response)[0]]);
  } else { resolve("Empty resolve"); }

  });
}


