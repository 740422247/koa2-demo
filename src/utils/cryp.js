/**
 * @description 加密方法
 * @author lixingxing
 */

const crypto = require('crypto');
const {
  CRYPTO_SECRET_KEY
} = require('../db/config/secretKeys');

/**
 * 
 * @param {string} content 明文 
 * @returns 
 */
function _md5(content){
  const md5 = crypto.createHash('md5');
  return md5.update(content).digest('hex')
}

function doCrypto(content){
  return _md5(`password=${content}&key=${CRYPTO_SECRET_KEY}`)
}

module.exports = doCrypto