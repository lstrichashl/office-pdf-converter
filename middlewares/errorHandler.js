var logger = require("../lib/logger");

var errorHandler = function(err, req,res ,next){
    logger.error(err.message, {exeption: err.stack});
    res.status(500).json({stacktrace: err.stack, message: err.message});
};

module.exports = errorHandler;