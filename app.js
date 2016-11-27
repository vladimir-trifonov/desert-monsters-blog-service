'use strict'

const express = require('express');
var app = express();

var env = process.env.NODE_ENV || 'development';
var config = require('./server/config/config')[env];

require('./server/config/express')(config, app);
require('./server/config/database')(config);
require('./server/config/routes')(app);

app.listen(config.port, () => {
    console.log('Listening on port ' + config.port);
});