export default {
    path: '/WebGL',
    name: 'WebGL入门指南',
    component: () => import( /* webpackChunkName: "Chapter2" */ '@/views/Chapter2'),
    children: [{
        path: 'Chapter1',
        name: 'Chapter1',
        component: () => import( /* webpackChunkName: "Chapter1" */ '@/views/Chapter1.vue')
    }]
}