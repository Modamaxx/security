'use strict';


/**
 * Returns check status of hash compare
 *
 * no response value expected for this operation
 **/
const crypto = require('crypto');

exports.vhashPOST = function(req) {
  return new Promise(function(resolve, reject) {

  var data = req.body.data;
  var generHash = req.body.generHash;

  var hash = crypto.createHash("sha256").update(data, "utf-8").digest("hex");
  var response = {};

  
  if(generHash == hash) { 
    response['application/json'] = {"status": 0};
  }
  else {
    response['application/json'] = {"status": 1, "checkHash": hash};
  }

  if (Object.keys(response).length > 0) {
    resolve(response[Object.keys(response)[0]]);
  } 
  else { resolve("Empty resolve"); }

  });
}

