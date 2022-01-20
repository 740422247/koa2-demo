const router = require('koa-router')()
const {
  SECRET
} = require('../db/config/config')
const jsonwebtoken = require('jsonwebtoken');
// const util = require('util');
// const verify = util.promisify(jsonwebtoken.verify);

const {getUserMessage} = require('./common')

const {
  User,
  Blog
} = require('../db/models/index');

router.post('/login', async (ctx, next) => {

  try {
    const {
      userName,
      password
    } = ctx.request.body;
    const user = await User.findOne({
      where: {
        userName
      }
    })

    if (user.dataValues.password === password) {
      const token = jsonwebtoken.sign({
        ...ctx.request.body,
        id: user.id
      }, SECRET, {
        expiresIn: '12h'
      })
      ctx.body = {
        code: 1,
        token,
      }
    } else {
      ctx.body = {
        code: 0,
        message: '用户名或密码不正确'
      }
    }
  } catch (error) {
    ctx.body = '错误'
  }


})

router.get('/getUserInfo', async (ctx, next) => {

  try {
    const {
      userName,
      id
    } = await getUserMessage(ctx)//await verify(token.split(' ')[1], SECRET);

    const {
      nickName
    } = await User.findOne({
      where: {
        userName
      }
    })

    ctx.body = {
      code: 1,
      userInfo: {
        userName,
        nickName,
        id
      }
    }
  } catch (err) {
    ctx.body = {
      code: -1,
      msg: 'error:' + err
    }
  }
})

router.get('/', async (ctx, next) => {
  await ctx.render('error', {
    title: 'error page'
  })
  ctx.body = 'koa2 body root'
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

router.get('/test', async (ctx,next) => {
  await ctx.render('test', {
    title: 'test page',
    content: "this is content of test page ",
    isMe: false,
    arr: ['a','b','c']
  })
  // ctx.body = 'test'
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