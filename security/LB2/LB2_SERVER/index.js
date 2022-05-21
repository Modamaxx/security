'use strict';

var path = require('path');
var fs = require('fs');
var https = require('https');

var oas3Tools = require('oas3-tools');
var serverPort = 8080;

// swaggerRouter configuration
var options = {
    routing: {
        controllers: path.join(__dirname, './controllers')
    },
    key: fs.readFileSync('HTTPS4/www.pentagon.by.key.pem'),
    cert: fs.readFileSync('HTTPS4/www.pentagon.by.cert.pem'),
    passphrase: "1234",
    ca: fs.readFileSync('HTTPS4/ca-chain.cert.pem')
};

var expressAppConfig = oas3Tools.expressAppConfig(path.join(__dirname, 'api/openapi.yaml'), options);
var app = expressAppConfig.getApp();

https.createServer(options, app).listen(serverPort, function () {
    console.log('Your HTTPS server is listening on port %d (https://localhost:%d)', serverPort, serverPort);
    console.log('Swagger-ui is available on https://localhost:%d/docs', serverPort);
});