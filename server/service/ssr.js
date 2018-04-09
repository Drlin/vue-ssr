const path = require('path')
const Router = require('koa-router')
const { createBundleRenderer } = require('vue-server-renderer')
const fs = require('fs')

const serverConfig = require('../../build/webpack.server.js')
const clientConfig = require('../../build/webpack.client.js')
const serverRender = require('./server-render.js')

const bundlePath = path.join(serverConfig.output.path, 'vue-ssr-server-bundle.json')
const clientManifestPath = path.join(clientConfig.output.path, '/vue-ssr-client-manifest.json')
const bundle = fs.readFileSync(bundlePath, 'utf-8')
const clientManifest = fs.readFileSync(clientManifestPath, 'utf-8')
const router = new Router()

router.get('*', async (ctx) => {
  const renderer = createBundleRenderer(JSON.parse(bundle), {
    inject: false,
    clientManifest: JSON.parse(clientManifest)
  })

  await serverRender(ctx, renderer)
})

module.exports = router
