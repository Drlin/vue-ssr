import Vue from 'vue'
import Router from 'vue-router'
import Msite from '../pages/msite'
import Freedinner from '../pages/freedinner'
Vue.use(Router)

export default () => {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        name: 'msite',
        component: Msite,
        meta: {
          title: '首页'
        }
      },
      {
        path: '/freedinner',
        name: 'freedinner',
        component: Freedinner,
        meta: {
          title: '免单红包'
        }
      }
    ]
  })
}
