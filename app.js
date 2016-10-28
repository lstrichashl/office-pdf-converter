var express = require('express');
var viewer = require('./routes/viewer');
var attacheUUID = require("./middlewares/attachUUID");

var app = express();

app.use(attacheUUID);
app.use('/view',viewer);

app.listen(3000);