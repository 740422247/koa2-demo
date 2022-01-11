const mysql = require('mysql2')

const {
  Sequelize
} = require('sequelize');

const sequelize = new Sequelize('sys', 'root', '123456', {
  host: 'localhost',
  dialect: 'mysql'
})

const connection = mysql.createConnection({
  host: 'localhost', //数据库地址
  port: '3306', //端口号
  user: 'root', //用户名
  password: '123456', //密码
  database: 'sys' //数据库名称
})

const getSuccessResult = (data, message) => ({
  data,
  status: 1,
  message
})

const getErrorResult = (error, message) => ({
  status: 0,
  error,
  message
})

const getDateTime = str => {
  const date = str ? new Date(str) : new Date();
  return `${date.toLocaleDateString().replace(/\//g, '-')} ${date.toTimeString().split(' ')[0]}`
}

module.exports = {
  connection,
  getSuccessResult,
  getErrorResult,
  sequelize,
  format: {
    getDateTime
  }
}