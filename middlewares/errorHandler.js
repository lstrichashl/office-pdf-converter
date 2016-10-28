var logger = require("../lib/logger");

var errorHandler = function(err, request,response ,next){
    logger.error(err.message, {exeption: err.stack});
    response.status(500).json({stacktrace: err.stack, message: err.message});
};

module.exports = errorHandler;