const { STRING } = require('sequelize');
const Sequelize = require('sequelize');
const seq = require('../seq');
const User = require('./user.model');

const Blog = seq.define('blog', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

module.exports = Blog;