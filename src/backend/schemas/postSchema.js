const mongoose = require('mongoose');

const postSchema = mongoose.Schema(
  {
    username: String,
    wallet: String,
    tag: String,
    caption: String,
    image: String,
  },
  {timestamps: {type: Number, default: new Date().getTime()}}
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
