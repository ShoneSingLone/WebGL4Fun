export default {
    path: '/svg',
    name: 'SVG',
    component: () => import( /* webpackChunkName: "SVG" */ '@/views/SVG'),
    children: [{
        path: 'example1',
        name: 'svg基本',
        component: () => import( /* webpackChunkName: "example1" */ '@/views/SVG/example1.vue')
    }]
}