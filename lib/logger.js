var winston = require('winston');
var fs = require('fs');
var logDir = "./logs";

module.exports = new winston.Logger({
    transports: [
        new winston.transports.File({
            timestamp: Date.now,
            filename: logDir + '/app.log',
            handleExeptions: true,
            colorize: false,
            humanReadableUnhandleException: true,
            maxsize: 200000000,
            maxFiles: 10,
            json: false
        })
    ]
});