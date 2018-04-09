import App from './app'
import Vue from 'vue'
import Meta from 'vue-meta'
import createRouter from './routers'
import './test.css'

Vue.use(Meta)

export default () => {
  const router = createRouter()
  const app = new Vue({
    App,
    router,
    render: h => h(App)
  })
  return { app, router }
}
