const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const GroupPostSchema = new mongoose.Schema(
  {
    caption: String,
    wallet: String,
    uid: String,
    image: String,
    gid: String,
    likes: [
      {
        type: ObjectId,
      },
    ],
    default: {
      likes: 0,
    },
  },
  {timestamps: {type: Number, default: new Date().getTime()}}
);

const GroupPost = mongoose.model('GroupPost', GroupPostSchema);

module.exports = GroupPost;
