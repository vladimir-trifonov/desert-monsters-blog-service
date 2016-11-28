'use strict'

const express = require('express');
var app = express();

var env = process.env.NODE_ENV || 'development';
var config = require('./server/config/config')[env];

require('./server/config/express')(config, app);
require('./server/config/database')(config);
require('./server/config/routes')(app);

app.listen(config.port, function () {
    if (env === 'production') {
        var Thalassa = require('thalassa');
        var client = new Thalassa.Client({
            apiport: 80,
            host: process.env.SERVICE_REGISTRY,
            log: function (i, m) {
                console.log(m);
            }
        });

        client.register('desert-monsters-blog-service', '1.0.0', config.port, {
            url: process.env.HOST
        });
        client.start();

    }

    console.log('Server listens at port:' + config.port);
});