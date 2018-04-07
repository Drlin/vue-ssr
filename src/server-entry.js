import createApp from './create-app'

export default context => {
  const { app, router } = createApp()
  return new Promise((resolve, reject) => {
    router.push(context.url)
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      if (!matchedComponents.length) {
        return reject(new Error('NOT MSTCHED ROUTE'))
      }
      resolve(app)
    })
  })
}
