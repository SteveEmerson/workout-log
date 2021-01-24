let express = require('express');
let router = express.Router();
let User = require('../db').import('../models/user');
let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');
let validateSession = require('../middleware/validate-session');

/*************************
 *** REGISTER NEW USER ***
 *************************/
router.post('/register',function(req, res){
  console.log(`******Got to register POST ... req_data : ${req.body}`);
  let userModel = {
    username: req.body.username,
    passwordhash: bcrypt.hashSync(req.body.passwordhash, 12)
  }
  User.create(userModel)
    .then(function createSuccess(user){
      let token = jwt.sign(
        {id: user.id}, 
        process.env.JWT_SECRET, 
        {expiresIn: 60*60*24}
        );
      res.json(
        {
          user: user,
          message: "New user registered.",
          sessionToken: token
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

/*************************
 *** LOGIN USER ***
 *************************/

router.post('/login', validateSession, function(req, res){
  User.findOne({
    where: 
    {
      username: req.body.username, 
    }
  })
  .then(function loginSuccess(user){
    if(user){
      bcrypt.compare(req.body.passwordhash, user.passwordhash, function(err, matches){
        if(matches){
          let token = jwt.sign(
            {
              id: user.id,
              username: user.username
            },
            process.env.JWT_SECRET,
            {
              expiresIn: 60*60*24
            }
          );
          res.status(200).json(
            {
              user: user,
              message: "Login Successful",
              sessionToken: token
            }
          );
        }
      });
    }else{
      res.status(500).send(`${req.body.username} not found.`);
    }
  })
  .catch(function(err){
    res.status(500).json(
      {error: err}
    );
  });
});

module.exports = router;