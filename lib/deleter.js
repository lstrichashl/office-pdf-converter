var fs = require('fs');
var Q = require("q");
var config = require("config");

function deleteFile(filePath) {
    var defer = Q.defer();
    fs.unlink(filePath, function(error){
        if(error){
            error.file = filePath;
            error.message = error.message || "delete file failed";
            defer.reject(error);
        }
        else{
            defer.resolve(filePath);
        }
    });
    return defer.promise;
}

module.exports = deleteFile;