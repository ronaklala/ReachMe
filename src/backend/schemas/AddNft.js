const mongoose = require('mongoose');

const addnftSchema = mongoose.Schema(
  {
    username: String,
    wallet: String,
    description: String,
    image: String,
    token_name: String,
  },
  {timestamps: {type: Number, default: new Date().getTime()}}
);

const AddNFT = mongoose.model('AddNft', addnftSchema);

module.exports = AddNFT;
