import createApp from './create-app'

import './test.css'

const { router, app } = createApp()

router.onReady(() => {
  app.$mount('#root')
})
