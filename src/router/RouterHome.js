import Home from '@/views/Home/index.vue'

export default {
    path: '/home',
    name: 'home',
    component: Home,
    children: [{
            path: 'table_example',
            name: '表单',
            component: () => import( /* webpackChunkName: "TableExample" */ '@/views/Home/TableExample.vue')
        }, {
            path: 'upload',
            name: 'upload',
            component: () => import( /* webpackChunkName: "Home.example2" */ '@/views/Home/example2.vue')
        }, {
            path: 'select-tree',
            name: 'selectTree',
            component: () => import( /* webpackChunkName: "Home.example2" */ '@/views/Home/example4.vue')
        }, {
            path: 'red',
            name: 'red',
            component: () => import( /* webpackChunkName: "Home.example2" */ '@/views/Home/example3.vue')
        },
        {
            path: 'carousel',
            name: '轮播图',
            component: () => import( /* webpackChunkName: "Home.example2" */ '@/views/Home/carousel.vue')
        },
        {
            path: 'flexible-panel',
            name: '扩展panel',
            component: () => import( /* webpackChunkName: "Home.flexiblePanel" */ '@/views/Home/flexiblePanel.vue')
        }, {
            path: 'register',
            name: '注册',
            component: () => import( /* webpackChunkName: "Home.register" */ '@/views/Home/register.vue')
        }, {
            path: 'pockjs',
            name: 'pockjs',
            component: () => import( /* webpackChunkName: "Home.register" */ '@/views/Home/pockjs.vue')
        }, {
            path: 'region',
            name: 'region',
            component: () => import( /* webpackChunkName: "Home.register" */ '@/views/Home/region.vue')
        }, {
            path: 'drag',
            name: 'drag',
            component: () => import( /* webpackChunkName: "Home.register" */ '@/views/Home/drag.vue')
        }
    ]
}