const mongoose = require('mongoose');

// Scheama for the user
const commentSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    username: String,
    content: String,
});

const postSchema = mongoose.Schema({
    userID: String,
    username: String,
    title: String,
    content: String,
    category: String,
    date: Date,
    likes: Number,
    comments: [commentSchema],

}, {
    versionKey: false
});

const PostModel = mongoose.model("posts", postSchema)

module.exports = {
    PostModel
}