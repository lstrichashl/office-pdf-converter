var express = require('express');
var viewer = require('./routes/viewer');
var sanity = require('./routes/sanity');
var config = require('./routes/config');
var attacheUUID = require("./middlewares/attachUUID");
var errorHandler = require("./middlewares/errorHandler");

var app = express();

app.use(attacheUUID);
app.use('/view',viewer);
app.use('/sanity', sanity);
app.use('/config', config);
app.use(errorHandler);

app.listen(3000);