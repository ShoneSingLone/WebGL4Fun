export default {
    path: '/chart',
    name: 'chart',
    component: () => import( /* webpackChunkName: "chart" */ '@/views/chart'),
    children: [{
        path: 'example1',
        name: '基本',
        component: () => import( /* webpackChunkName: "chart.example" */ '@/views/chart/example.vue')
    }]
}