'use strict';


/**
 * Returns hello world page. BPOMS
 *
 * no response value expected for this operation
 **/

exports.rootGET = function() {
  return new Promise(function(resolve, reject) {
    resolve("Hello world! BPOMS");
  });
}

