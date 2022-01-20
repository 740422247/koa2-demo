const router = require('koa-router')()
const {
  User
} = require('../db/models/index');
const {getUserMessage} = require('./common')

router.prefix('/users')

router.get('/getAll', async (ctx, next) => {
  const userInfo = await getUserMessage(ctx)
  console.log(userInfo);
  ctx.body = 'get users all'
})

router.get('/bar', function (ctx, next) {
  console.log({a: 'aaa',b : 'bbb'})
  ctx.body = 'this is a users/bar response'
})

module.exports = router
