const router = require('koa-router')()
const {
  SECRET
} = require('../db/config/config')
const jsonwebtoken = require('jsonwebtoken');
const util = require('util');
const verify = util.promisify(jsonwebtoken.verify);

const {
  User,
  Blog
} = require('../db/models/index');

router.post('/login', async (ctx, next) => {

  const token = jsonwebtoken.sign(ctx.request.body, SECRET, {
    expiresIn: '20h'
  })
  ctx.body = {
    token,
    userInfo: ctx.request.body
  }
})

router.get('/getUserInfo', async (ctx, next) => {

  const token = ctx.header.authorization;
  try {
    const payload = await verify(token.split(' ')[1], SECRET);

    ctx.body = {
      code: 1,
      userInfo: payload
    }
  } catch (err) {
    ctx.body = {
      code: -1,
      msg: 'error:' + err
    }
  }
})

router.get('/', async (ctx, next) => {

  const result = await Blog.findAndCountAll({
    limit: 3,
    offset: 2,
    include: {
      model: User,
      attributes: ['userName', 'nickName']
    }
  })

  console.log('===:', result, result.rows.map(item => ({
    ...item.dataValues,
    ...item.user.dataValues
  })))

  ctx.body = {
    code: 1,
    data: {
      count: result.count,
      rows: result.rows.map(item => ({
        ...item.dataValues,
        ...item.user.dataValues
      }))
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