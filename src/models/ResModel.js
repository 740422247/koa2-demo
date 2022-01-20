/**
 * @description res 数据模型
 * @author lixingxing
 */

/**
 * 基础模型
 */
class BaseModel {
  constructor({
    errno,
    data,
    message
  }) {
    this.errno = errno;
    if (data) {
      this.data = data;
    }
    if (message) {
      this.message = message
    }
  }
}

/**
 * 成功返回数据模型
 */
class SuccessModel extends BaseModel {
  constructor(data = {}) {
    super({
      errno: 0,
      data
    })
  }
}

/**
 * 失败返回数据模型
 */
class ErrorModel extends BaseModel {
  constructor({
    errno,
    message
  }) {
    super({
      errno,
      message
    })
  }
}

module.exports = {
  SuccessModel,
  ErrorModel
}