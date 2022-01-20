const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const jwtKoa = require('koa-jwt')
const logger = require('koa-logger')

// const index = require('./routes/index')
// const users = require('./routes/users')

// 路由
const UserApiRouter = require('./routes/api/user')
const UserViewRouter = require('./routes/views/User')
const errorViewRouter = require('./routes/views/error')

const { SESSION_SECRET_KEY } = require('./db/config/secretKeys')

// error handler
const onerrorConf = {
  redirect: '/error'
}
onerror(app, onerrorConf)

app.use(jwtKoa({
  secret: SESSION_SECRET_KEY 
}).unless({
path: [/^\/*/]  //完全不需要验证token
  // path: [/^\/json/,/^\/string/, /^\/login/,/^\/getUserInfo/]  // 不需要验证token的路由
}))

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
// app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))  // 使用ejs文件

// logger
// app.use(async (ctx, next) => {
//   const start = new Date()
//   await next()
//   const ms = new Date() - start
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
// })

// routes 注册
app.use(UserApiRouter.routes(), UserApiRouter.allowedMethods())
app.use(UserViewRouter.routes(), UserViewRouter.allowedMethods())
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app