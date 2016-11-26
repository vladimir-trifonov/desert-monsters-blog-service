'use strict'

const path = require('path');
var rootPath = path.normalize(path.join(__dirname, '/../../'));

module.exports = {
    development: {
        rootPath: rootPath,
        db: 'mongodb://localhost:27017/posts-db',
        youtubeApiKey: 'AIzaSyBBHCdte-6VJ8_hP4OEmBrppYCX0gGNCFg',
        port: 3000
    },
    production: {
        rootPath: rootPath,
        db: process.env.MONGO_DB_CONN_STRING,
        port: process.env.port
    }
}