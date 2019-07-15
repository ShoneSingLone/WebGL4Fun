export default {
    path: '/svg',
    name: 'SVG',
    component: () => import( /* webpackChunkName: "SVG" */ '@/views/SVG'),
    children: [{
        path: 'example1',
        name: 'svg基本',
        component: () => import( /* webpackChunkName: "example1" */ '@/views/SVG/example1.vue')
    }, {
        path: 'example2',
        name: 'svg基本2',
        component: () => import( /* webpackChunkName: "example2" */ '@/views/SVG/example2.vue')
    }, {
        path: 'example3',
        name: 'svg裁剪和蒙版',
        component: () => import( /* webpackChunkName: "example3" */ '@/views/SVG/example3.vue')
    }]
}