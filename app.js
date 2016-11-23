var express = require('express');
var viewer = require('./routes/viewer');
var sanity = require('./routes/sanity');
var attacheUUID = require("./middlewares/attachUUID");
var errorHandler = require("./middlewares/errorHandler");
var config = require("config");

var app = express();

app.use(attacheUUID);
app.use('/view',viewer);
app.use('/sanity', sanity);
app.get('/config', function(request, response){
    response.status(200).json(config);
});
app.use(errorHandler);

app.listen(config.get("port"));