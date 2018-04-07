const webpack = require('webpack')
const MemoryFS = require('memory-fs')
const path = require('path')
const axios = require('axios')
const Router = require('koa-router')
const { createBundleRenderer } = require('vue-server-renderer')

const serverConfig = require('../../build/webpack.server.js')
const config = require('../../build/config/value.js')
const serverRender = require('./server-render.js')
const mfs = new MemoryFS()
const complier = webpack(serverConfig)
let bundle
complier.outputFileSystem = mfs
complier.watch({}, (err, stats) => {
  if (err) {
    throw err
  }
  stats = stats.toJson()
  stats.errors.forEach(err => console.log(err))
  stats.warnings.forEach(warn => console.warn(err))
  const bundlePath = path.join(serverConfig.output.path, 'vue-ssr-server-bundle.json')

  bundle = mfs.readFileSync(bundlePath, 'utf-8')
})

const router = new Router()

router.get('*', async (ctx) => {
  if (!bundle) {
    ctx.body = 'just wating'
    return
  }

  const clientManifest =
    await axios.get('http://localhost:' + config.client.port + '/public/vue-ssr-client-manifest.json')
      .then(({ data }) => data)

  const renderer = createBundleRenderer(JSON.parse(bundle), {
    inject: false,
    clientManifest
  })

  await serverRender(ctx, renderer)
})

module.exports = router
