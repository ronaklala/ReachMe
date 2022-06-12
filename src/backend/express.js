/* eslint-disable no-unused-vars */
const express = require('express');
const app = express();
const port = 5001;
const mongoose = require('mongoose');
const User = require('./schemas/userSchema');
var bodyParser = require('body-parser');
var cors = require('cors');

const DB =
  'mongodb+srv://Warrior:Ronak3103@mydb.tgsvt.mongodb.net/social_media?retryWrites=true&w=majority';
mongoose
  .connect(DB)
  .then(() => { })
  .catch((err) => console.log(err));

// Put these statements before you define any routes.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

//Create User Post
app.use(require('./queries/transaction'));
app.use(require('./queries/post'));

app.listen(port, console.log('Listening on Port 5001'));

//registering a user
app.post('/register', async (req, res) => {
  const profile_url = null;
  const { username, wallet, email } = req.body;
  const userExist = await User.findOne({ wallet: wallet });
  try {
    if (!userExist) {
      const user = new User({ username, wallet, email, profile_url });
      user
        .save()
        .then(() => {
          res.status(201).json({ message: 'User Registeres' });
        })
        .catch((err) => console.log(err));
    } else {
      return res.status(500).json({ error: 'Cannot Register ID already Taken' });
    }
  } catch (err) {
    console.log(err);
  }
});

//Login of a user
app.post('/login', async (req, res) => {
  const userExist = await User.findOne({ wallet: req.body.wallet }).then(
    (doc) => {
      if (!doc) {
        res.status(500).json({ message: 'No Data Found' });
      } else {
        res.status(200).json({ doc });
      }
    }
  );
});
