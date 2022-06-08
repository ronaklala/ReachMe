const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema(
  {
    from: String,
    to: String,
    eth: String,
    hash: String,
    userId: String,
    postId: String,
    txntype: String,
  },
  {timestamps: {type: Number, default: new Date().getTime()}}
);

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
