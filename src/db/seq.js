const Sequelize = require('sequelize');

const conf = {
  host: 'localhost',
  dialect: 'mysql'
}

const seq = new Sequelize('test', 'root', '123456', conf);

// seq.authenticate().then(() => {
//   console.log('success')
// }).catch(() => {
//   console.log('error')
// })

module.exports = seq;