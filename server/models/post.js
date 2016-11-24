'use strict'

const mongoose = require('mongoose');
var requiredValidationMessage = '{PATH} is required';


var postSchema = new mongoose.Schema({
    user: {
        id: { type: String, required: requiredValidationMessage },
        name: { type: String, required: requiredValidationMessage },
        avatar: { type: String, required: requiredValidationMessage },
    },

    content: {
        text: { type: String, required: requiredValidationMessage },
        videoTitle: [{ type: String, required: requiredValidationMessage }]
    },

    createdAt: { type: Date, default: Date.now }
});

postSchema.pre('save', (next) => {
    var now = new Date().now;
    this.createdAt = now;
    next();
});

module.exports = mongoose.model('Post', postSchema);