'use strict'

var Post = require('../models/post');
var utils = require('../utils/utils');
var ytUtil = require('../utils/youtube');

module.exports = (app) => {

    //add a post
    app.post('/posts', (req, res) => {
        var post = new Post({
            user: req.user,
            content: {
                text: req.body.text,
                type: 'blog:text'
            }
        });

        ytUtil(req.body.text)
            .then(function (youtubeTxt) {
                return new Promise(function (resolve, reject) {
                    youtubeTxt && (post.content.extra = youtubeTxt) && (post.content.type = 'blog:youtube');

                    post.save((err, saved) => {
                        if (err) {
                            return reject(err);
                        }

                        res.send({
                            ok: true,
                            saved: saved
                        });

                        process.nextTick(function () {
                            resolve(saved);
                        });
                    });
                });
            })
            .then(function (post) {
                utils.exportToTheWall({
                    content: post.content,
                    user: post.user
                }, req.headers.authorization)
                .catch(console.log);
            })
            .catch(function (err) {
                console.log(err);
                res.sendStatus(500)
            });
    })

    // get all posts
    app.get('/posts', (req, res) => {
        Post.find().sort({ createdAt: -1 }).exec((err, posts) => {
            if (err) {
                return res.send(err);
            }

            res.json({
                ok: true,
                posts: posts
            });
        })
    })

    // get users and sort by last created post
    app.get('/posts/last', (req, res) => {
        Post.aggregate(
            [
                {
                    $group: {
                        _id: '$user.id',
                        content: {
                            $last: '$content'
                        },
                        user: {
                            $last: '$user'
                        },
                        createdAt: {
                            $last: '$createdAt'
                        }
                    }
                },
                { $sort: { createdAt: -1 } }
            ], (err, posts) => {
                if (err) res.send(err);

                res.json({
                    ok: true,
                    posts: posts
                });
            })
    })

    // get a single post by id
    app.get('/posts/:id', (req, res) => {
        Post.findById(req.params.id, (err, post) => {
            if (err) {
                return res.send(err);
            }

            res.json({
                ok: true,
                post: post
            });
        })
    })

    // delete a post 
    app.delete('/posts/:id', (req, res) => {
        Post.remove({
            _id: req.params.id
        }, (err, post) => {
            if (err) {
                return res.send(err);
            }

            res.json({ ok: true, message: 'Post deleted!' });
        })
    })

    // get all post by userId
    app.get('/users/:userid/posts', (req, res) => {
        var userId = req.params.userid;

        Post.find({ 'user.id': userId }).sort({ createdAt: -1 }).exec((err, posts) => {
            if (err) {
                return res.send(err);
            }

            res.json({
                ok: true,
                posts: posts
            });
        });
    })

    app.put('/users/:userid/posts/:postid', (req, res) => {
        var action = req.param('action');
        if (!action || action !== 'like') {
            return res.sendStatus(404);
        }

        Post.findById(req.params.postid, (err, post) => {
            if (err) {
                return res.sendStatus(500);
            }

            process.nextTick(() => {
                utils.sendLikeData({
                    content: post.content,
                    user: post.user
                })
                    .then(() => {
                        res.send({
                            ok: true
                        });
                    })
                    .catch(() => {
                        res.sendStatus(500);
                    });
            })
        });
    })
}