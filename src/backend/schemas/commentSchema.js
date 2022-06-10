const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    user: {type: ObjectId, ref: 'User'},
    postId: {
      type: ObjectId,
      ref: 'Post',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('comment', commentSchema);
