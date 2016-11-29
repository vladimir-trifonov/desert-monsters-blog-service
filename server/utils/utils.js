'use strict'

var request = require('request');
const bodyParser = require('body-parser');
var serviceDiscovery = require('./discovery.service');

function youtubeLinks(text) {
    var results = [];
    var match = text.match(/(http:|https:)?\/\/(www\.)?(youtube.com|youtu.be)\/(watch)?(\?v=)?(\S+)?/);
    if (match != null) {
        var videoId = getId(match[0]);
        results.push(videoId);
    }

    return results;
}

function getId(url) {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);

    if (match && match[2].length == 11) {
        return match[2];
    } else {
        return 'error';
    }
}

function sendLikeData(postToSend) {
    return new Promise((resolve, reject) => {
        request({
            url: 'http://localhost:8080/',
            method: 'PUT',
            json: true,
            body: postToSend
        }, (err, res) => {
            if (err || res.statusCode !== 200) {
                return reject(err);
            }

            resolve();
        });
    });
}

function exportToTheWall(postToSend) {
    return new Promise((resolve, reject) => {
        serviceDiscovery('desert-monsters-wall-service')
            .then(function (url) {
                request({
                    url: url + '/posts',
                    method: 'POST',
                    json: true,
                    body: postToSend
                }, (err, res) => {
                    if (err || res.statusCode !== 200) {
                        return reject(err);
                    }

                    resolve();
                });
            });
    });
}

module.exports = {
    youtubeLinks,
    getId,
    sendLikeData,
    exportToTheWall
}