const express = require('express');
const Transaction = require('../schemas/TransactionSchema');
const router = express.Router();

router.post('/user_tip', (req, res) => {
  const {from, to, hash, eth, userId, postId, txntype} = req.body;
  const txn = new Transaction({from, to, hash, eth, userId, postId, txntype});
  txn
    .save()
    .then((res) => {})
    .catch((err) => {});
});

module.exports = router;
