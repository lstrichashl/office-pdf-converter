var router = require("express").Router();
var converter = require("../lib/converter");
var httpRequest = require("request");
var fs = require("fs");
var Q = require("q");
var config = require("config");
var deleteFile = require("../lib/deleter");

module.exports = router;

router.use(function(request, response, next){
    var url = request.query.url;
    request.tempFile = config.get("outdir") + "\\" + request.flowUUID;
    var fileWriteStream = fs.createWriteStream(request.tempFile);
    httpRequest(url).pipe(fileWriteStream);
    next();
});

router.use(function(request, response, next){
    converter(request.tempFile)
        .then(function(pdfFile){
            request.pdfFile = pdfFile;
            deleteFile(request.tempFile);
            next();
        })
});

router.use(function(request, response, next){
    response.setHeader('Content-disposition', 'inline; filename="' + request.tempFile+ '"');
    response.setHeader('Content-type', 'application/pdf');
    fs.createReadStream(request.pdfFile).pipe(response);
    response.on("finish", function(){
        deleteFile(request.pdfFile);
    });
});

