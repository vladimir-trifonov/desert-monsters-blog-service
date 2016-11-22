'use strict'

var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

module.exports = (config) => {
    mongoose.connect(config.db);

    var db = mongoose.connection;

    db.once('open', (err) => {
        if (err) console.log(err);

        console.log('MongoDB is ready!');
    });

    db.on('error', (err) => console.log('Database error: ' + err));
}