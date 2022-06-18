const mongoose = require('mongoose');

const savepost = mongoose.Schema(
  {
    postid: String,
    username: String,
    userid: String,
    image: String,
    token_name: String,
  },
  {timestamps: {type: Number, default: new Date().getTime()}}
);

const SavePost = mongoose.model('saveposts', savepost);

module.exports = SavePost;
