const router = require('koa-router')()

router.prefix('/users')

router.get('/', function (ctx, next) {
  const params = ctx.query
  ctx.body = {
    params,
    content: 'this is users 0'
  }
})

router.get('/bar', function (ctx, next) {
  console.log({a: 'aaa',b : 'bbb'})
  ctx.body = 'this is a users/bar response'
})

module.exports = router
