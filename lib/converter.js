var exec = require("child_process").exec;
var Q = require("q");
var config = require("config");

module.exports = function(file){
    var defer = Q.defer();
    var command = buildCommand(file, "pdf", config.get("outdir"));
    exec(command, function(error, stdout, stderr){
        if(error){
            defer.reject(error);
        }
        defer.resolve(config.get("outdir") + "\\" + deleteExtension(getFileName(file)) + ".pdf");
    })
};

function buildCommand(file, format, outdir){
    var soffice = buildPath(config.get("Libreoffice.installationPath") + "\\program\\soffice");
    var sourceFile = buildPath(file);
    return [soffice, "--headless", "--convert-to", format, "--outdir", outdir, sourceFile].join(" ");
}

function buildPath(path){
    return "\"" + path + "\"";
}

function deleteExtension(fileName){
    return fileName.substr(0, fileName.lastIndexOf('.'));
}

function getFileName(fileName){
    var d1 = fileName.lastIndexOf('\\');
    var d2 = fileName.lastIndexOf('/');
    var d = d1 > d2 ? d1 : d2;
    return fileName.substr(d + 1);
}