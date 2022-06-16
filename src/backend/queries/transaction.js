const express = require('express');
const {default: mongoose} = require('mongoose');
const AddNFT = require('../schemas/AddNft');
const commentSchema = require('../schemas/commentSchema');
const GroupPost = require('../schemas/GroupPostSchema');
const Group = require('../schemas/groupSchema');
const Post = require('../schemas/postSchema');
const Transaction = require('../schemas/TransactionSchema');
const router = express.Router();
const User = require('../schemas/userSchema');

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

router.post('/followUser/:uid/:fid', (req, res) => {
  const uid = req.params.uid;
  const fid = req.params.fid;
  const user_follower = User.findByIdAndUpdate(
    uid,
    {
      $push: {followers: fid},
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

//Unfollow User
router.post('/unfollowUser/:uid/:fid', (req, res) => {
  const uid = req.params.uid;
  const fid = req.params.fid;
  const user_follower = User.findByIdAndUpdate(
    uid,
    {
      $pull: {followers: fid},
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

//Create-Group
router.post('/create_group', (req, res) => {
  const {name, description, image, username, wallet, uid} = req.body;
  const group = new Group({name, description, image, username, wallet});
  group.members.push(uid);
  group.save().then((result) => {
    res.status(200).json({message: 'Group Created'});
  });
});

//get all groups data
router.get('/groups', (req, res) => {
  const groups = Group.find({}).then((doc) => {
    res.status(200).json(doc);
  });
});

//Get Single Group Data
router.get('/group/:gid', (req, res) => {
  const groupId = mongoose.Types.ObjectId(req.params.gid);
  const group = Group.aggregate([
    {
      $match: {_id: groupId},
    },
    {
      $lookup: {
        from: 'users',
        localField: 'members',
        foreignField: '_id',
        as: 'user_details',
      },
    },
  ]).then((data) => {
    res.json(data);
  });
});

router.post('/join_group/:uid/:gid', (req, res) => {
  const uid = mongoose.Types.ObjectId(req.params.uid);
  const gid = mongoose.Types.ObjectId(req.params.gid);
  const join_group = Group.findByIdAndUpdate(
    gid,
    {
      $push: {members: uid},
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

router.post('/leave_group/:uid/:gid', (req, res) => {
  const uid = mongoose.Types.ObjectId(req.params.uid);
  const gid = mongoose.Types.ObjectId(req.params.gid);
  const join_group = Group.findByIdAndUpdate(
    gid,
    {
      $pull: {members: uid},
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

router.get('/group/:gid/posts', (req, res) => {
  const gid = mongoose.Types.ObjectId(req.params.gid);
  const group = Group.findById(gid).then((data) => {
    res.json(data);
  });
});

router.post('/group/:gid/createGroupPost', (req, res) => {
  const gid = mongoose.Types.ObjectId(req.params.gid);
  const {caption, image, uid, wallet} = req.body;
  const post = new GroupPost({caption, image, uid, wallet, gid});
  post.save().then((doc) => {
    res.json(doc);
  });
});

router.get('/group/:gid/getPosts', (req, res) => {
  const groupPosts = GroupPost.aggregate([
    {
      $match: {gid: req.params.gid},
    },
    {
      $lookup: {
        from: 'users',
        localField: 'wallet',
        foreignField: 'wallet',
        as: 'user_details',
      },
    },
  ])
    .sort({createdAt: -1})
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
