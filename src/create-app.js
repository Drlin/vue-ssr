import App from './app'
import Vue from 'vue'
import createRouter from './routers'
import './test.css'

export default () => {
  const router = createRouter()
  const app = new Vue({
    App,
    router,
    render: h => h(App)
  })
  return { app, router }
}
