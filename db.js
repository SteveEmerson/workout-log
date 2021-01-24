const Sequelize = require('sequelize');
const sequelize = new Sequelize('workout-log', 'postgres', 'password', 
  {
    host: 'localhost',
    dialect: 'postgres'
  }
);

sequelize.authenticate()
  .then(
    function(){
      console.log('connected to workout log database');
    },
    function(err){
      console.log(err);
    }
);

module.exports = sequelize;

