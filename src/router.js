import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home/index.vue'

let RouterThreeJS = {
  path: '/ThreeJS',
  name: 'ThreeJS',
  component: () => import( /* webpackChunkName: "ThreeJS" */ './views/ThreeJS'),
  children: [{
    path: 'example1',
    name: 'ThreeJS.example1',
    component: () => {
      debugger;
      return import( /* webpackChunkName: "ThreeJS.example1" */ './views/ThreeJS/example1');
    }
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
  }, {
    path: 'example7',
    name: '网格Mesh',
    component: () => import( /* webpackChunkName: "ThreeJS.example7" */ './views/ThreeJS/example7')
  }, {
    path: 'example8',
    name: '动画',
    component: () => import( /* webpackChunkName: "ThreeJS.example8" */ './views/ThreeJS/example8')
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
let RouterAnimation = {
  path: '/animation',
  name: 'Vue过渡',
  component: () => import( /* webpackChunkName: "Animation" */ './views/Animation'),
  children: [{
    path: 'example1',
    name: '单元素/组件的过渡',
    component: () => import( /* webpackChunkName: "example1" */ './views/Animation/example1.vue')
  }, {
    path: 'example2',
    name: '列表的过渡',
    component: () => import( /* webpackChunkName: "example2" */ './views/Animation/example2.vue')
  }, {
    path: 'example3',
    name: '数组的过渡',
    component: () => import( /* webpackChunkName: "example3" */ './views/Animation/example3.vue')
  }]
}

let RouterSVG = {
  path: '/svg',
  name: 'SVG',
  component: () => import( /* webpackChunkName: "SVG" */ './views/SVG'),
  children: [{
    path: 'example1',
    name: '基本',
    component: () => import( /* webpackChunkName: "example1" */ './views/SVG/example1.vue')
  }]
}

let RouterHome = {
  path: '/home',
  name: 'home',
  component: Home,
  children: [{
      path: 'table_example',
      name: '表单',
      component: () => import( /* webpackChunkName: "TableExample" */ './views/Home/TableExample.vue')
    }, {
      path: 'upload',
      name: 'upload',
      component: () => import( /* webpackChunkName: "Home.example2" */ './views/Home/example2.vue')
    }, {
      path: 'select-tree',
      name: 'selectTree',
      component: () => import( /* webpackChunkName: "Home.example2" */ './views/Home/example4.vue')
    }, {
      path: 'red',
      name: 'red',
      component: () => import( /* webpackChunkName: "Home.example2" */ './views/Home/example3.vue')
    },
    {
      path: 'carousel',
      name: '轮播图',
      component: () => import( /* webpackChunkName: "Home.example2" */ './views/Home/carousel.vue')
    },
    {
      path: 'flexible-panel',
      name: '扩展panel',
      component: () => import( /* webpackChunkName: "Home.flexiblePanel" */ './views/Home/flexiblePanel.vue')
    }, {
      path: 'register',
      name: '注册',
      component: () => import( /* webpackChunkName: "Home.register" */ './views/Home/register.vue')
    }, {
      path: 'pockjs',
      name: 'pockjs',
      component: () => import( /* webpackChunkName: "Home.register" */ './views/Home/pockjs.vue')
    }
  ]

};

Vue.use(Router)

let routes = [
  RouterHome,
  {
    path: '/about',
    name: 'about',
    component: () => import( /* webpackChunkName: "about" */ './views/About.vue')
  },
  RouterWebGL,
  RouterThreeJS,
  RouterSVG,
  RouterAnimation
];

export let routeTree = routes;

export default new Router({
  routes
})