var config = require('config');

function getSupportedMimeTypes(){
    var supportedTypes;
    try{
        supportedTypes = config.get('supportedMimeTypes');
    }
    catch(err){
        supportedTypes = undefined;
    }
    return supportedTypes;
}

function isSupportedType(mimeType){
    var supportedTypes = getSupportedMimeTypes();
    if(supportedTypes){
        return getSupportedMimeTypes().indexOf(mimeType) != -1;
    }
    return true;
}

module.exports = {
    getSupportedMimeTypes: getSupportedMimeTypes,
    isSupportedType: isSupportedType
};