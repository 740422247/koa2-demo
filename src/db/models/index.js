const User = require('./user.model');
const Blog = require('./blog.model');

Blog.belongsTo(User, {
  foreignKey: 'userId'
})

User.hasMany(Blog, {
  foreignKey: 'userId'
})

module.exports = {
  User,
  Blog
}