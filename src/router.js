import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
let RouterThreeJS = {
  path: '/ThreeJS',
  name: 'ThreeJS',
  component: () => import( /* webpackChunkName: "ThreeJS" */ './views/ThreeJS'),
  children: [{
    path: 'example1',
    name: 'ThreeJS.example1',
    component: () => import( /* webpackChunkName: "ThreeJS.example1" */ './views/ThreeJS/example1')
  }, {
    path: 'example2',
    name: 'ThreeJS.example2',
    component: () => import( /* webpackChunkName: "ThreeJS.example2" */ './views/ThreeJS/example2')
  }, {
    path: 'example3',
    name: 'OrthographicCamera',
    component: () => import( /* webpackChunkName: "ThreeJS.example3" */ './views/ThreeJS/example3')
  }, {
    path: 'example4',
    name: 'Perspective',
    component: () => import( /* webpackChunkName: "ThreeJS.example4" */ './views/ThreeJS/example4')
  }, {
    path: 'example5',
    name: '几何Geometry',
    component: () => import( /* webpackChunkName: "ThreeJS.example5" */ './views/ThreeJS/example5')
  }, {
    path: 'example6',
    name: '材质Material',
    component: () => import( /* webpackChunkName: "ThreeJS.example6" */ './views/ThreeJS/example6')
  },{
    path: 'example7',
    name: '网格Mesh',
    component: () => import( /* webpackChunkName: "ThreeJS.example7" */ './views/ThreeJS/example7')
  }]
};


let RouterWebGL = {
  path: '/WebGL',
  name: 'WebGL入门指南',
  component: () => import( /* webpackChunkName: "Chapter2" */ './views/Chapter2'),
  children: [{
    path: 'Chapter1',
    name: 'Chapter1',
    component: () => import( /* webpackChunkName: "Chapter1" */ './views/Chapter1.vue')
  }, {
    path: 'Chapter2/example1',
    name: 'Chapter2.example1',
    component: () => import( /* webpackChunkName: "Chapter2.example1" */ './views/Chapter2/example1')
  }, {
    path: '/WebGL/Chapter2/example2',
    name: 'Chapter2.example2',
    component: () => import( /* webpackChunkName: "Chapter2.example2" */ './views/Chapter2/example2')
  }]
}

Vue.use(Router)

let routes = [{
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: () => import( /* webpackChunkName: "about" */ './views/About.vue')
  },
  RouterWebGL,
  RouterThreeJS,
];

export let routeTree = routes;
export default new Router({
  routes
})