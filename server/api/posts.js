'use strict'

var Post = require('../models/post');
var utils = require('../utils/utils');

module.exports = (app) => {

    //add a post
    app.post('/posts', (req, res) => {
        var post = new Post();
        var user = req.body.user;
        var text = req.body.content.text;

        post.user = user
        post.content.text = text;

        require('../utils/youtube')(text, post, res);
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

        var userTest = {
            id: '545621',
            name: 'Stamat'
        };

        var postToSend = {
            user: {
                id: userTest.id,
                name: userTest.name
            }
        };

        Post.findById(req.params.postid, (err, post) => {
            if (err) res.send(err);

            postToSend.owner = post.user;
            postToSend.content = post.content;
        }).then(() => {
            utils.sendLikeData(postToSend);
        });
    })
}