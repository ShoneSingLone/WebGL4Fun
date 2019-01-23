import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "about" */ './views/About.vue')
    }, {
      path: '/Chapter1',
      name: 'Chapter1',
      component: () => import( /* webpackChunkName: "Chapter1" */ './views/Chapter1.vue')
    }, {
      path: '/Chapter2',
      name: 'Chapter2',
      component: () => import( /* webpackChunkName: "Chapter2" */ './views/Chapter2'),
      children: [{
        path: 'example1',
        name: 'Chapter2.example1',
        component: () => import( /* webpackChunkName: "Chapter2.example1" */ './views/Chapter2/example1')
      }]
    }
  ]
})