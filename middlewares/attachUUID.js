var uuid = require("uuid4");

module.exports = function(req, res, next){
    req.flowUUID = uuid();
    next();
};