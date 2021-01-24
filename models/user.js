/* Model for the User table */
// username ... string ... null = false
// passwordhash ... string ... null = false

module.exports = function(sequelize, DataTypes){
  const User = sequelize.define('user',
  {
    username: {
      type: DataTypes.STRING,
      allownull: false,
      unique: true
    },
    passwordhash: {
      type: DataTypes.STRING,
      allownull: false
    }
  });
  return User;
}