let express = require('express');
let router = express.Router();

router.get('/practice',function(req, res){
  res.send('Practice endpoint from the workout server user controller.')
})

module.exports = router;