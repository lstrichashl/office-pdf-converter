var express = require('express');
var viewer = require('./routes/viewer');
var attacheUUID = require("./middlewares/attachUUID");
var errorHandler = require("./middlewares/errorHandler");

var app = express();

app.use(attacheUUID);
app.use('/view',viewer);
app.use(errorHandler);

app.listen(3000);