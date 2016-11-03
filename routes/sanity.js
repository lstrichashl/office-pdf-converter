var router = require("express").Router();

router.get(function(request, response){
    response.status(200)
        .json({status:200});
});

module.exports = router;