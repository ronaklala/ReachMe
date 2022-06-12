const express = require('express');
const {default: mongoose} = require('mongoose');
const AddNFT = require('../schemas/AddNft');
const commentSchema = require('../schemas/commentSchema');
const Transaction = require('../schemas/TransactionSchema');
const User = require('../schemas/userSchema');
const router = express.Router();

router.post('/user_tip', (req, res) => {
  const {from, to, hash, eth, userId, postId, txntype} = req.body;
  const txn = new Transaction({from, to, hash, eth, userId, postId, txntype});
  txn
    .save()
    .then((res) => {})
    .catch((err) => {});
});

//Showing NFTS to the marketplace section
router.get('/MarketPlace', (req, res) => {
  const nfts = AddNFT.aggregate([
    {
      $lookup: {
        from: 'users',
        localField: 'username',
        foreignField: 'username',
        as: 'user_details',
      },
    },
  ])
    .sort({createdAt: -1})
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.status(500);
    });
});

//Get Comments for a Post
router.get('/get-comments/:postid', (req, res) => {
  const postid = mongoose.Types.ObjectId(req.params.postid);
  const comment = commentSchema
    .aggregate([
      {
        $match: {postId: postid},
      },
      {
        $lookup: {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as: 'user_details',
        },
      },
    ])
    .sort({createdAt: -1})
    .exec(function (err, result) {
      res.json(result);
    });
});

module.exports = router;
