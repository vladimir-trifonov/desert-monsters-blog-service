'use strict'

var Post = require('../models/post');
var utils = require('../utils/utils');

module.exports = (app) => {

    //add a post
    app.post('/posts', (req, res) => {
        var post = new Post({
            user: req.user,
            content: {
                text: req.body.text
            }
        });

        require('../utils/youtube')(req.body.text, post, res);
    })

    // get all posts
    app.get('/posts', (req, res) => {
        Post.find({}, (err, posts) => {
            if (err) res.send(err);

            res.json(posts);
        })
    })

    // get users and sort by last created post
    app.get('/posts/last', (req, res) => {
        Post.aggregate(
            [
                { '$group': { '_id': '$user.id', 'createdAt': { '$last': '$createdAt' } } },
                { '$sort': { 'createdAt': -1 } }
            ], (err, posts) => {
                if (err) res.send(err);

                res.json(posts);
            })
    })

    // get a single post by id
    app.get('/posts/:id', (req, res) => {
        Post.findById(req.params.id, (err, post) => {
            if (err) res.send(err);

            res.json(post);
        })
    })

    // delete a post 
    app.delete('/posts/:id', (req, res) => {
        Post.remove({
            _id: req.params.id
        }, (err, post) => {
            if (err) res.send(err);

            res.json({ message: 'Post deleted!' });
        })
    })

    // get all post by userId
    app.get('/users/:userid/posts', (req, res) => {
        var userId = req.params.userid;

        Post.find({ 'user.id': userId }, (err, posts) => {
            if (err) res.send(err);

            res.json(posts);
        });
    })

    app.put('/users/:userid/posts/:postid', (req, res) => {
        var action = req.param('action');
        if (!action || action !== 'like') {
            return res.status(404);
        }

        Post.findById(req.params.postid, (err, post) => {
            if (err) {
                return res.sendStatus(500);
            }

            process.nextTick(() => {
                utils.sendLikeData({
                        content: post.content,
                        owner: post.user,
                        user: req.user
                    }).then(() => {
                        res.sendStatus(200);
                    })
                    .catch(() => {
                        res.sendStatus(500);
                    });
            })
        });
    })
}