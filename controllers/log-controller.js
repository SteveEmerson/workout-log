let express = require('express');
let router = express.Router();
let validateSession = require('../middleware/validate-session');
let Log = require('../db.js').import('../models/log');

/*************************
 *** USER CREATE LOG ***
 *************************/
router.post('/', validateSession, function(req, res){
  const logEntry = {
    description: req.body.description,
    definition: req.body.definition,
    result: req.body.result,
    owner_id: req.user.id
  }
  Log.create(logEntry)
    .then(function logCreateSuccess(log){
      return res.status(200).json(log);
    })
    .catch(function logCreateFail(err){
      return res.status(500).json({error: err, message: "Log creation failed."});
    })
});

/*************************
 *** GET ALL USER LOGS ***
 *************************/
router.get('/', validateSession, function(req, res){
  Log.findAll({
    where:{
      owner_id: req.user.id
    }
  })
  .then(logs => res.status(200).json(logs))
  .catch(err => res.status(500).json({error: err}))
});

 /*************************
 *** GET USER LOG BY ID **
 *************************/
router.get('/:id', validateSession, function(req, res){
  console.log(req.params);
  Log.findOne({
    where:{
      id: req.params.id,
      owner_id: req.user.id
    }
  })
  .then((log) => {
    if(!log) {
      return res.status(200).send('No matching log entry found.')
    }else{
      return res.status(200).json(log)
    }
    
  })
  .catch(err => res.status(500).json({error:err}));
});

/*************************
 *** UPDATE USER LOG   ***
 *************************/ 
router.put('/:id',validateSession, function(req, res){
  const updateLogEntry = {
    description: req.body.description,
    definition: req.body.definition,
    result: req.body.result
    //owner_id: req.user.id
  }

  const query = {where: {id: req.params.id, owner_id: req.user.id}}

  Log.update(updateLogEntry, query)
    .then(update => {
      if(update[0] ===0){
        return res.status(200).send('No matching log entry found.')
      }else{
        return res.status(200).json({message: `${update[0]} logs updated`})
      }
    })
    .catch(err => res.status(500).json({error: err}))
});

 /*************************
 ***  DELETE USER LOG   ***
 *************************/
router.delete('/:id', validateSession, function(req, res){
  Log.destroy({
    where: {
      id: req.params.id,
      owner_id: req.user.id
    }
  })
    .then(update => {
      if(update === 0){
        return res.status(200).send('No matching log entry found.')
      }else{
        return res.status(200).json({message: `${update} logs removed`})
      }
      //return res.status(200).json(log);
    })
    .catch(err => res.status(500).json({error: err}));
});
module.exports = router;

