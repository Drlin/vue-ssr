// 返回html
const ejs = require('ejs')
const fs = require('fs')
const path = require('path')

module.exports = async (ctx, renderer) => {
  ctx.headers['Content-Type'] = 'text/html'
  const context = { url: ctx.path }
  const template = fs.readFileSync(path.join(__dirname, '../../server.templete.ejs'), 'utf-8')
  try {
    const appString = await renderer.renderToString(context)
    const { title } = context.meta.inject()
    const html = ejs.render(template, {
      appString,
      title: title.text(),
      style: context.renderStyles(),
      scripts: context.renderScripts()
    })
    ctx.body = html
  } catch (e) {
    console.log(e)
    ctx.body = e
  }
}
