/* Model for the log table */
// description ... string ... null = false
// definition ... string ... null = false\
// result ... string
// owner_id ... integer

//IF YOU NEED TO CHANGE THE COLUMNS ... DROP THE TABLE IN PGADMIN AND RESTART NODEMON

module.exports = function(sequelize, DataTypes){
  const Log = sequelize.define('log',
  {
    description: {
      type: DataTypes.STRING,
      allownull: false,
      unique: true
    },
    definition: {
      type: DataTypes.STRING,
      allownull: false
    },
    result: {
      type: DataTypes.STRING,
      allownull: false
    },
    owner_id:{
      type: DataTypes.INTEGER,
      allownull: false
    }
  });
  return Log;
}