/**
 * @description user api 路由
 * @author lixingxing
 */

const router = require('koa-router')();

const {
  isExist,
  register
} = require('../../controller/user')

router.prefix('/api/user');

// 用户是否存在
router.post('/isExist', async (ctx, next) => {
  const {
    userName
  } = ctx.request.body;
  ctx.body = await isExist(userName);
})

// 用户注册
router.post('/register', async (ctx, next) => {
  const {userName, password, gender, nickName} = ctx.request.body;
  ctx.body = await register({userName, password, gender, nickName});

})


module.exports = router;