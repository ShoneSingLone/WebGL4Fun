import Vue from 'vue'
import Router from 'vue-router'
/*  */
import RouterHome from './RouterHome.js'
import RouterThreeJS from './RouterThreeJS.js'
import RouterWebGL from './RouterWebGL.js'
import RouterAnimation from './RouterAnimation.js'
import RouterSVG from './RouterSVG.js'
import RouterChart from './RouterChart.js'
import RouterTools from './RouterTools.js'


Vue.use(Router);

let routes = [
    RouterHome,
    {
        path: '/about',
        name: 'about',
        component: () => import( /* webpackChunkName: "about" */ '@/views/About.vue')
    },
    RouterWebGL,
    RouterThreeJS,
    // RouterSVG,
    RouterChart,
    RouterAnimation,
    RouterTools
];

export let routeTree = routes;

export default new Router({
    routes
})