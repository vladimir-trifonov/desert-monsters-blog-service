'use strict'

const mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
    user: {
        id: { type: String, required: '{PATH} is required' },
        name: { type: String, required: '{PATH} is required' },
        avatar: { type: String, required: '{PATH} is required' },
    },
    content: { type: String, required: '{PATH} is required' },
    createdAt: { type: Date, default: Date.now }
});

postSchema.pre('save', (next) => {
    var now = new Date().now;
    this.createdAt = now;
    next();
});

module.exports = mongoose.model('Post', postSchema);