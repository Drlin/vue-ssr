const Koa = require('koa')
const proxy = require('koa-proxy')

const devRouter = require('./service/dev-ssr.js')
const proRouter = require('./service/ssr.js')
const staticrouter = require('./service/static.js')

const isDev = process.env.NODE_ENV === 'development'
const app = new Koa()

const pageRouter = isDev ? devRouter : proRouter
// 统一的错误处理
app.use(async (ctx, next) => {
  try {
    await next()
  } catch (e) {
    console.log(e)
  }
})
if (isDev) {
  app.use(proxy({
    host: 'http://localhost:8831/',
    match: /^\/public\//
  }))
} else {
  app.use(staticrouter.routes()).use(staticrouter.allowedMethods())
}

app.use(pageRouter.routes()).use(pageRouter.allowedMethods())

app.listen(3000)
