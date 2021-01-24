require('dotenv').config();
let express = require('express');
let app = express();
let sequelize = require('./db');

let log = require('./controllers/log-controller');
let user = require('./controllers/user-controller');

sequelize.sync();

app.use(require('./middleware/headers'));
app.use(express.json());

/**********************
      ENDPOINTS
***********************/

app.use('/test/', function(req,res){
  res.send("This is a message from the workout log test endpoint.")
})


app.use('/log', log);
app.use('/user', user);


app.listen(3000, function(){
  console.log('Workout server is up!');
})

