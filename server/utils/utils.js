'use strict'

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

module.exports = {
    youtubeLinks,
    getId
}