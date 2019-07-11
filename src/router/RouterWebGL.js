export default {
    path: '/WebGL',
    name: 'WebGL入门指南',
    component: () => import( /* webpackChunkName: "Chapter2" */ '@/views/Chapter2'),
    children: [{
        path: 'Chapter1',
        name: 'Chapter1',
        component: () => import( /* webpackChunkName: "Chapter1" */ '@/views/Chapter1.vue')
    }, {
        path: 'Chapter2/example1',
        name: 'Chapter2.example1',
        component: () => import( /* webpackChunkName: "Chapter2.example1" */ '@/views/Chapter2/example1')
    }, {
        path: '/WebGL/Chapter2/example2',
        name: 'Chapter2.example2',
        component: () => import( /* webpackChunkName: "Chapter2.example2" */ '@/views/Chapter2/example2')
    }]
}