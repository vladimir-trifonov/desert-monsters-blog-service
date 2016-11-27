'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('express-jwt');

module.exports = (config, app) => {
    app.set('secret', config.secret);

    app.use(jwt({ secret: app.set('secret') }));
    app.use(cors());

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
}