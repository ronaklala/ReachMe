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
  try {
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
  } catch {
    res.status(500).json({message: 'No Group Data Found'});
  }
});

//Joinging a  Group
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

//Leaving a Group
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

//Getting Group Posts
router.get('/group/:gid/posts', (req, res) => {
  const gid = mongoose.Types.ObjectId(req.params.gid);
  const group = Group.findById(gid).then((data) => {
    res.json(data);
  });
});

//Creating Group Post
router.post('/group/:gid/createGroupPost', (req, res) => {
  const gid = mongoose.Types.ObjectId(req.params.gid);
  const {caption, image, uid, wallet} = req.body;
  const post = new GroupPost({caption, image, uid, wallet, gid});
  post.save().then((doc) => {
    Group.findByIdAndUpdate(
      gid,
      {
        $push: {posts: uid},
      },
      {
        new: true, //for new updated record
      }
    ).exec((err, result) => {
      if (err) {
        return res.status(422).json({error: err});
      } else {
        res.json(doc);
      }
    });
  });
});

//Getting Group Posts With User Data
router.get('/group/:gid/getPosts', (req, res) => {
  const gid = mongoose.Types.ObjectId(req.params.gid);
  const groupPosts = GroupPost.aggregate([
    {
      $match: {gid: gid},
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

//Getting User Followers with user Data
router.get('/followers/:uid', (req, res) => {
  const wallet = req.params.uid;
  const user_followers = User.aggregate([
    {
      $match: {wallet: wallet},
    },
    {
      $lookup: {
        from: 'users',
        localField: 'followers',
        foreignField: '_id',
        as: 'user_details',
      },
    },
  ]).then((doc) => {
    res.json(doc);
  });
});

//Updating User Profile
router.post('/updateProfile/:uid', (req, res) => {
  const email = req.body.email;
  const username = req.body.username;
  const update_user = User.findOneAndUpdate(
    {
      wallet: req.params.uid,
    },
    {
      email,
      username,
    }
  ).then((doc) => {
    res.status(200).json({message: 'updated'});
  });
});

//Get Single NFT data
router.get('/getsinglenft/:id', (req, res) => {
  const id = mongoose.Types.ObjectId(req.params.id);
  const singlenft = AddNFT.aggregate([
    {
      $match: {_id: id},
    },
    {
      $lookup: {
        from: 'users',
        localField: 'wallet',
        foreignField: 'wallet',
        as: 'user_details',
      },
    },
  ]).then((doc) => {
    res.json(doc);
  });
});

//Get single Group Post
router.get('/gpost/:pid', (req, res) => {
  const id = mongoose.Types.ObjectId(req.params.pid);
  const singlepost = GroupPost.aggregate([
    {
      $match: {_id: id},
    },
    {
      $lookup: {
        from: 'users',
        localField: 'wallet',
        foreignField: 'wallet',
        as: 'user_details',
      },
    },
    {
      $lookup: {
        from: 'groups',
        localField: 'gid',
        foreignField: '_id',
        as: 'group',
      },
    },
  ]).then((doc) => {
    res.json(doc);
  });
});

module.exports = router;
