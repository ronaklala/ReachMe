const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  wallet: String,
  email: String,
  profile_url: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
