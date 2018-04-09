const Router = require('koa-router')
const send = require('koa-send')
const path = require('path')

const staticRouter = new Router({ prefix: '/public' })

staticRouter.get('/*', async ctx => {
  await send(ctx, ctx.path.replace('/public', '/dist'))
})

module.exports = staticRouter
