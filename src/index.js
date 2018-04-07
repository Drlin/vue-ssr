import Vue from 'vue'
import App from './app'
import createRouter from './routers'

import './test.css'

const router = createRouter()
new Vue({
  router,
  render: (h) => h(App),
  el: '#root'
})
