const router = require('koa-router')()
const {User, Blog} = require('../db/models/index')

router.get('/', async (ctx, next) => {

  const result = await Blog.findAndCountAll({
    limit: 3,
    offset: 1,
    include: {
      model: User,
      attributes: ['userName', 'nickName']
    }
  })

  console.log('===:', result, result.rows.map(item => ({...item.dataValues, ...item.user.dataValues})))

  ctx.body = {
    code: 1,
    data: {
      count: result.count,
      rows: result.rows.map(item => ({...item.dataValues, ...item.user.dataValues}))
    }
  }
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
