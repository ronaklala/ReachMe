const express = require('express');
const router = express.Router();
const path = require('path');
var nodemailer = require('nodemailer');
var hbs = require('nodemailer-express-handlebars');

router.post('/send-mail', (req, res) => {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ronaklala2010@gmail.com',
      pass: 'qwrinoiftrupvdfx',
    },
  });

  const handlebarOptions = {
    viewEngine: {
      extName: '.handlebars',
      partialsDir: path.resolve('./views'),
      defaultLayout: false,
    },
    viewPath: path.resolve('./views'),
    extName: '.handlebars',
  };

  transporter.use('compile', hbs(handlebarOptions));
  var mailOptions = {
    from: 'ReachME ADMIN',
    to: req.body.email,
    subject: 'Message Sent Successfully',
    template: 'email',
    context: {
      username: req.body.username,
      email: req.body.email,
      message: req.body.message,
    },
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      res.status(200).json({message: 'Mail Sent'});
    }
  });
});

module.exports = router;
