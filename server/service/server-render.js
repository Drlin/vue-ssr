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
    const html = ejs.render(template, {
      appString,
      style: context.renderStyles(),
      scripts: context.renderScripts()
    })
    ctx.body = html
  } catch (e) {
    console.log(e)
    ctx.body = '2222'
  }
}
