const express = require('express');
const Post = require('../schemas/postSchema');
const User = require('../schemas/userSchema');
const router = express.Router();

//Creating a Post
router.post('/create-post', (req, res) => {
  const {caption, image, tag, wallet, username} = req.body;
  const post = new Post({caption, tag, image, wallet, username});
  post
    .save()
    .then(() => {
      res.status(201).json({message: 'Post Created Successfully'});
    })
    .catch(() => {
      res.status(500).json({message: 'Internal Server Error'});
    });
});

router.get('/posts/:uid', async (req, res) => {
  const wallet = req.params.uid;
  const user_posts = await Post.find({wallet: wallet}).then((doc) => {
    if (!doc) {
      res.status(404).json({message: 'No Posts Found'});
    } else {
      res.status(203).json({doc});
    }
  });
});

//get user Date

//home page post 
router.get('/posts', async (req, res) => res.json(await Post.find({}).sort({ createdAt: -1 }).exec()));



router.get('/:uid', async (req, res) => {
  const Data = {
    users: {},
    numbers: '',
  };
  const wallet = req.params.uid;
  const userdata = await User.find({wallet: wallet})
    .limit(1)
    .then((doc) => {
      Data.users = doc;

      if (doc[0] == undefined) {
        res.status(500).json({message: 'No Users Found'});
      } else {
        const Count = Post.find({wallet: wallet})
          .count()
          .then((posts) => {
            Data.numbers = posts.toString();
            res.status(200).json(Data);
          });
      }
    });
});

//upload user pic
router.post('/user_pic', async (req, res) => {
  const UserPic = await User.findOneAndUpdate(
    {wallet: req.body.wallet},
    {
      $set: {
        profile_url: req.body.url,
      },
    },
    {
      upsert: true,
      returnDocument: 'after', // this is new !
    }
  )
    .then((doc) => {
      res.status(200).json({message: 'Updated'});
    })
    .catch((err) => {
      res.status(500).json({message: 'Error'});
    });
});

module.exports = router;
