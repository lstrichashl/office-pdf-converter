var exec = require("child_process").exec;
var Q = require("q");
var config = require("config");

module.exports = function(fileToConvert){
    var defer = Q.defer();
    var command = buildCommand(fileToConvert, "pdf", config.get("outdir"));
    exec(command, function(error, stdout, stderr){
        if(error){
            defer.reject(error);
        }
        defer.resolve({path: config.get("outdir"), name: fileToConvert.name + "pdf"});
    })
};

function buildCommand(fileToConvert, format, outdir){
    var soffice = buildPath(config.get("Libreoffice.installationPath") + "\\program\\soffice");
    var sourceFile = buildPath(fileToConvert.path + "\\" + fileToConvert.name);
    return [soffice, "--headless", "--convert-to", format, "--outdir", outdir, sourceFile].join(" ");
}

function buildPath(path){
    return "\"" + path + "\"";
}