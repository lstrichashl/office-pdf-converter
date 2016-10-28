var winston = require('winston');
var fs = require('fs');
//var formatter = require('');
var logDir = "./logs";

function optionMetadataParser(options){
    var metadata = "";
    //options = formatter.flattenObject()
}

function customFormatFiles(options){
    if(options.meta.message){
        options.message = options.meta.message;
        delete options.meta.message;
    }
    return "blablabla";
}

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