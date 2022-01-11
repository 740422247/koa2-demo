const Sequelize = require('sequelize');
const seq = require('../seq');

const User = seq.define('user', {
  userName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  nickName: {
    type: Sequelize.STRING
  },
  sex: {
    type: Sequelize.STRING
  },
  
});

module.exports = User
