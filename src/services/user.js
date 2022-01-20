/**
 * @description user service
 * @author lixingxing
 */

const {
  User
} = require('../db/models/index')


/**
 * 获取用户信息
 * @param {string} userName 
 * @param {string} password 
 */
async function getUserInfo(userName, password) {
  const filter = {
    userName
  };
  if (password) {
    filter.password = password
  }

  const result = await User.findOne({
    where: filter
  });

  if (result == null) {
    return result;
  }

  const formatRes = formatUser(result.dataValues);
  return formatRes

}

/**
 * 
 * @param {string} userName 用户名
 * @param {string} password 密码
 * @param {number} [gender=3] 1:男；2：女；3：保密；
 * @param {string} nickName 昵称
 */
async function createUser({userName, password, gender = 3, nickName}) {
  const result = User.create({
    userName,
    nickName,
    password,
    gender
  });
  const data = result.dataValues;

  return data;
}


module.exports = {
  getUserInfo,
  createUser
}