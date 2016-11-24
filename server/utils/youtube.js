'use strict'

var YouTube = require('youtube-node');
var utils = require('./utils');

module.exports = (text, post, res) => {
    var youTube = new YouTube();
    var videoId = utils.youtubeLinks(text)[0];
    var youtubeApiKey = 'AIzaSyBBHCdte-6VJ8_hP4OEmBrppYCX0gGNCFg';

    if (videoId) {
        youTube.setKey(youtubeApiKey);
        youTube.getById(videoId, (error, result) => {
            if (error) return res.sendStatus(500);

            post.content.videoTitle = result.items[0].snippet.title;
            post.save((err, post) => {
                if (err) return res.sendStatus(500);

                res.json(post);
            });
        });
    } else {
        post.save((err, post) => {
            if (err) return res.sendStatus(500);

            res.json(post);
        });
    }
}