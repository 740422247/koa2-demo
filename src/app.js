const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const jwtKoa = require('koa-jwt')
const logger = require('koa-logger')

const index = require('./routes/index')
const users = require('./routes/users')
const error = require('./routes/view/error')
const { SECRET } = require('./db/config/config')

// error handler
onerror(app)

app.use(jwtKoa({
  secret: SECRET 
}).unless({
  path: [/^\/json/,/^\/string/, /^\/login/,/^\/getUserInfo/]  // 不需要验证token的路由
}))

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
// app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
// app.use(async (ctx, next) => {
//   const start = new Date()
//   await next()
//   const ms = new Date() - start
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
// })

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
// app.use(error.routes(), error.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app