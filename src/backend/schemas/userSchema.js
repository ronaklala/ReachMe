const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const userSchema = new mongoose.Schema({
  username: String,
  wallet: String,
  email: String,
  profile_url: String,
  followers: [
    {
      type: ObjectId,
    },
  ],
  default: {
    followers: 0,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
