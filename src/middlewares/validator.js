const {
  jsonSchemaFileInfo
} = require("../models/ErrorInfo");
const {
  ErrorModel
} = require("../models/ResModel");


function genValidator(validateFn) {
  async function validator(ctx, next) {
    const data = ctx.request.body
    const result = validateFn(data)
    if (result) {
      ctx.body = new ErrorModel(jsonSchemaFileInfo);
      return;
    }
    await next()
  }
  return validator;
}

module.exports = {
  genValidator
}