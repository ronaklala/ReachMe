const mongoose = require('mongoose');

const addnftSchema = mongoose.Schema(
  {
    username: String,
    wallet: String,
    ethereum:Number,
    image: String,
  },
  {timestamps: {type: Number, default: new Date().getTime()}}
);

const AddNFT = mongoose.model('AddNft', addnftSchema);

module.exports = AddNFT;
