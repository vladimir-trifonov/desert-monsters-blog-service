'use strict'

var YouTube = require('youtube-node');
var utils = require('./utils');

var env = process.env.NODE_ENV || 'development';
var config = require('../config/config')[env];

module.exports = function (text) {
    return new Promise(function (resolve, reject) {
        var youTube = new YouTube();
        var videoId = utils.youtubeLinks(text)[0];
        var youtubeApiKey = config.youtubeApiKey;

        if (videoId) {
            youTube.setKey(youtubeApiKey);
            youTube.getById(videoId, function (error, result) {
                if (error) return reject(error);

                resolve(result.items[0].snippet.title);
            });
        } else {
            resolve(null);
        }
    });
}