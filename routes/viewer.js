var router = require("express").Router();
var converter = require("../lib/converter");
var httpRequest = require("request");
var fs = require("fs");
var Q = require("q");
var config = require("config");
var deleteFile = require("../lib/deleter");
var mimeTypes = require("../lib/mimeTypes");
var logger = require("../lib/logger");

module.exports = router;

router.use(function(request, response, next){
    var url = request.query.url;
    request.tempFile = config.get("outdir") + "\\" + request.flowUUID;
    var fileWriteStream = fs.createWriteStream(request.tempFile);
    httpRequest(url, function(error, res, body){
        if(mimeTypes.isSupportedType(res.headers['content-type'])){
            next();
        }
        else{
            logger.warn("mime type " + res.headers['content-type'] + " is not supported");
            cleanup(request);
            response.status(415).json({message:"mime type " + res.headers['content-type'] + " is not supported"});
        }
    }).pipe(fileWriteStream);
    //next();
});

router.use(function(request, response, next){
    converter(request.tempFile)
        .then(function(pdfFile){
            request.pdfFile = pdfFile;
            next();
        })
});

router.use(function(request, response, next){
    response.setHeader('Content-disposition', 'inline; filename="' + request.tempFile+ '"');
    response.setHeader('Content-type', 'application/pdf');
    fs.createReadStream(request.pdfFile).pipe(response);
    response.on("finish", function(){
        cleanup(request);
    });
});

function cleanup(request){
    if(request.tempFile){
        deleteFile(request.tempFile);
    }
    if(request.pdfFile){
        deleteFile(request.pdfFile);
    }
}

