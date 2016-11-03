var router = require("express").Router();
var config = require("config");

router.get("/", function(request, response){
    response.status(200).json({config: config});
});

router.get("/:key", function(request, response){
    var key = request.param("key");
    try{
        var con = config.get(key);
    }
    catch(error){
        con = config;
    }
    finally {
        response.status(200).json({key: con});
    }
});

module.exports = router;