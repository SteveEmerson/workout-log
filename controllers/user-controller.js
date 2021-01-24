let express = require('express');
let router = express.Router();
let User = require('../db').import('../models/user');

router.post('/register',function(req, res){
  console.log(`******Got to register POST ... req_data : ${req.body}`);
  let userModel = {
    username: req.body.username,
    passwordhash: req.body.passwordhash
  }
  User.create(userModel)
    .then(function createSuccess(user){
      res.json(
        {
          user: user,
          message: "New user registered."
        } 
      );
    })
    .catch(function(err){
      res.status(500).json({
        error: err,
        message: "Register new user failed."
      });
    });
});

module.exports = router;