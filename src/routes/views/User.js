/**
 * @description user view 路由
 * @author lixingxing
 */

 const router = require('koa-router')()

/**
 * 获取登录信息
 * @param {Object} ctx ctx
 */

// 用户登录
router.get('/login', async(ctx, next) => {
  await ctx.render('login', {})
})

// 用户注册
router.get('/register', async(ctx, next) => {
  await ctx.render('register', {})
})

module.exports = router;