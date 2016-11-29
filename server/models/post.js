'use strict'

const mongoose = require('mongoose');
var requiredValidationMessage = '{PATH} is required';


var postSchema = new mongoose.Schema({
    user: {
        id: { type: String, required: requiredValidationMessage },
        name: { type: String, required: requiredValidationMessage },
        avatar: { type: String },
    },

    content: {
        type: { type: String, required: requiredValidationMessage },
        text: { type: String, required: requiredValidationMessage },
        extra: [{ type: String }]
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Post', postSchema);