'use strict'

const path = require('path');
var rootPath = path.normalize(path.join(__dirname, '/../../'));

module.exports = {
    development: {
        rootPath: rootPath,
        db: 'mongodb://localhost:27017/posts-db',
        youtubeApiKey: process.env.YOUTUBE_API_KEY,
        secret: 'vsddffv8wef-fwekgf0o4mg-we0igofvweoi',
        port: 4000
    },
    production: {
        rootPath: rootPath,
        db: process.env.MONGO_DB_CONN_STRING,
        youtubeApiKey: process.env.YOUTUBE_API_KEY,
        secret: process.env.SECRET,
        port: process.env.PORT || 4000
    }
}