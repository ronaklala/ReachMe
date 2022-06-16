const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const groupSchema = new mongoose.Schema(
  {
    name: String,
    wallet: String,
    username: String,
    image: String,
    description: String,
    members: [
      {
        type: ObjectId,
      },
    ],
    posts: [
      {
        type: ObjectId,
      },
    ],
    default: {
      members: 0,
      posts: 0,
    },
  },
  {timestamps: {type: Number, default: new Date().getTime()}}
);

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;
