const express = require('express');
const {default: mongoose} = require('mongoose');
const AddNFT = require('../schemas/AddNft');
const commentSchema = require('../schemas/commentSchema');
const Post = require('../schemas/postSchema');
const Transaction = require('../schemas/TransactionSchema');
const router = express.Router();

//Saving the tip of user in backend
router.post('/user_tip', (req, res) => {
  const {from, to, hash, eth, userId, postId, txntype} = req.body;
  const txn = new Transaction({from, to, hash, eth, userId, postId, txntype});
  txn
    .save()
    .then((res) => {})
    .catch((err) => {});
});

//For liking a post
router.put('/likes', (req, res) => {
  Post.findByIdAndUpdate(
    req.body.post_id,
    {
      $push: {likes: req.body.uid},
    },
    {
      new: true, //for new updated record
    }
  ).exec((err, result) => {
    if (err) {
      return res.status(422).json({error: err});
    } else {
      res.json(result);
    }
  });
});

//for unliking a post
router.put('/unlikes', (req, res) => {
  Post.findByIdAndUpdate(
    req.body.post_id,
    {
      $pull: {likes: req.body.uid},
    },
    {
      new: true, //for new updated record
    }
  ).exec((err, result) => {
    if (err) {
      return res.status(422).json({error: err});
    } else {
      res.json(result);
    }
  });
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
