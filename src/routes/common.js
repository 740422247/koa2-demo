const {
  SECRET
} = require('../db/config/config')
const jsonwebtoken = require('jsonwebtoken');
const util = require('util');
const verify = util.promisify(jsonwebtoken.verify);
/**
 * 
 * @param {Object} ctx 
 * @returns userInfo
 */
const getUserMessage = async (ctx) => {
  const token = ctx.header.authorization;
  const result = await verify(token.split(' ')[1], SECRET);
  return result
}

module.exports = {
  getUserMessage
}