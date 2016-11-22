'use strict'

const express = require('express');
const bodyParser = require('body-parser');

module.exports = (config, app) => {
    app.set('view engine', 'pug');
    app.set('views', config.rootPath + 'server/views');

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(express.static(config.rootPath + 'public'));
}