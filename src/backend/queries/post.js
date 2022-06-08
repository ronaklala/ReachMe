const express = require('express');
const Post = require('../schemas/postSchema');
const AddNFT = require('../schemas/AddNft');

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


router.post('/MarketPlace', (req, res) => {
  const {image,ethereum, wallet, username} = req.body;
  const post = new AddNFT({image, wallet, username, ethereum});
  post
    .save()
    .then(() => {
      res.status(201).json({message: 'NFT Added Successfully'});
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
      console.log("hello :::::::::",res.json({doc}));
    }
  });
});

//Showings Users of App
router.get('/users', (req, res) => {
  const usersData = User.find()
    .then((doc) => {
      if (!doc) {
      } else {
        res.json(doc);
      }
    })
    .catch((err) => {
      res.status(500).json({error: 'No Data Found'});
    });
});

//home page post
router.get('/', async (req, res) => {
  const posts = Post.aggregate([
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
      res.json({doc});
    });
});

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

//Get Single Post
router.get('/p-self/:postid', (req, res) => {
  const post = req.params.postid;
  const postdata = Post.findById(post)
    .then((doc) => {
      if (!doc) {
        res.status(404).json({message: 'Post Not Found'});
      } else {
        res.status(201).json(doc);
      }
    })
    .catch((err) => {
      res.status(404).json({message: 'Post Not Found'});
    });
});

module.exports = router;
