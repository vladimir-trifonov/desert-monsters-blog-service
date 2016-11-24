'use strict'

var Post = require('../models/post');

module.exports = (app) => {

    // add a post
    app.post('/posts', (req, res) => {
        var post = new Post();
        var user = req.body.user;
        var text = req.body.content.text;

        post.user = user
        post.content.text = text;

        require('../utils/youtube')(text, post, res);
    })

    // get users and sort by last created post
    app.get('/posts/last', (req, res) => {
        Post.aggregate(
            [
                { '$group': { '_id': '$user.id', 'createdAt': { '$last': '$createdAt' } } },
                { '$sort': { 'createdAt': -1 } }
            ], (err, posts) => {
                if (err) res.send(err)

                res.json(posts)
            })
    })

    // get all posts
    app.get('/posts', (req, res) => {
        Post.find({}, (err, posts) => {
            if (err) res.send(err)

            res.json(posts)
        })
    })

    // get a single post by id
    app.get('/posts/:id', (req, res) => {
        Post.findById(req.params.id, function(err, posts) {
            if (err) res.send(err)

            res.json(posts)
        })
    })

    // get all post by userId
    app.get('/users/:userId/posts', (req, res) => {
        var userId = req.params.userId

        Post.find({ 'userId': userId }, (err, posts) => {
            if (err) res.send(err)

            res.json(posts)
        })
    })

    // delete a post
    app.delete('/posts/:id', (req, res) => {
        Post.remove({
            _id: req.params.id
        }, (err, post) => {
            if (err) res.send(err)

            res.json({ message: 'Post deleted!' })
        })
    })
}