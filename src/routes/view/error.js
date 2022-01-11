const router = require('koa-router')();

router.prefix('/error')

router.get('/', (ctx, next) => {
  ctx.body = 'error'
})

module.exports = router;