var exec = require("child_process").exec;
var Q = require("q");
var config = require("config");

module.exports = function(file){
    var defer = Q.defer();
    try{
        var command = buildCommand(file, "pdf", config.get("outdir"));
    }
    catch(error){
        error.file = file;
        error.message = "\'outdir\' not specified in config file";
        defer.reject(error);
    }
    exec(command, function(error, stdout, stderr){
        if(error){
            error.file = file;
            error.bash_command = command;
            error.message = "asdfasdf";
            defer.reject(error);
        }
        else{
            defer.resolve(config.get("outdir") + "\\" + deleteExtension(getFileName(file)) + ".pdf");
        }
    });
    return defer.promise;
};

function buildCommand(file, format, outdir){
    var soffice = buildPath(config.get("Libreoffice.installationPath") + "\\program\\soffice");
    var sourceFile = buildPath(file);
    if(!outdir){
        throw new Error("outdir not specified");
    }
    return [soffice, "--headless", "--convert-to", format, "--outdir", outdir, sourceFile].join(" ");
}

function buildPath(path){
    return "\"" + path + "\"";
}

function deleteExtension(fileName){
    var lastIndexDot = fileName.lastIndexOf('.');
    if(lastIndexDot == -1){
        return fileName;
    }
    return fileName.substr(0, lastIndexDot);
}

function getFileName(file){
    var d1 = file.lastIndexOf('\\');
    var d2 = file.lastIndexOf('/');
    var d = d1 > d2 ? d1 : d2;
    return file.substr(d + 1);
}