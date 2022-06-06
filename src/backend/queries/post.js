const express = require('express');
const Post = require('../schemas/postSchema');
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

module.exports = router;
