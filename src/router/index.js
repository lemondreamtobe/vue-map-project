import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/index'
import Map from '@/page/map'
import Search from '@/page/search'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Index,
      children: [{
          path: '',
          component: Search,
        },
        {
          path: '/map',
          component: Map,
        }
      ]
    },
  ]
})
