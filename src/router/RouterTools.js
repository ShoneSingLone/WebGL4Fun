export default {
    path: '/tools',
    name: 'Tools',
    component: () => import( /* webpackChunkName: "SVG" */ '@/views/Tools'),
    children: [{
        path: '/PageJsonEditor',
        name: 'PageJsonEditor',
        component: () => import( /* webpackChunkName: "about" */ '@/views/Tools/PageJsonEditor/PageJsonEditor.vue')
    }]
}