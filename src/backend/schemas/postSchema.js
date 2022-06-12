const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const postSchema = mongoose.Schema(
  {
    username: String,
    wallet: String,
    tag: String,
    caption: String,
    image: String,
    likes: [{
      type: ObjectId,
    }],
    default: {
      likes: 0
    },
    comment: [{
      type: ObjectId,
      ref: 'comment'
    }],
    
  },
  { timestamps: { type: Number, default: new Date().getTime() } }
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
