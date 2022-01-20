const {
  getUserInfo,
  createUser
} = require('../services/user')

const {
  SuccessModel,
  ErrorModel
} = require('../models/ResModel')

const {
  registerUserNameNotExistInfo,
  registerUserNameExistInfo,
  registerFailInfo
} = require('../models/ErrorInfo');
const doCrypto = require('../utils/cryp');

/**
 * @description 用户名是否存在
 * @param {string} userName 用户名
 * @returns 
 */
async function isExist(userName) {
  const userInfo = await getUserInfo(userName);

  if (userInfo) {
    return new SuccessModel(userInfo)
  } else {
    return new ErrorModel(registerUserNameNotExistInfo)
  }

}

/**
 * 
 * @param {string} userName 用户名
 * @param {string} password 密码
 * @param {number} [gender=3] 1:男；2：女；3：保密
 * @param {string} nickName 昵称
 */
async function register({userName, password, gender, nickName}) {

  const userInfo = await getUserInfo(userName);
  // 用户名，已存在
  if (userInfo) {
    return new ErrorModel(registerUserNameExistInfo);
  }
  // 可以正常注册
  try {
    await createUser({userName, password: doCrypto(password), gender, nickName});
    return new SuccessModel();
  } catch (error) {
    return new ErrorModel(registerFailInfo)
  }
  

}

module.exports = {
  isExist,
  register
}