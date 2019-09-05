export default {
    path: '/svg',
    name: 'SVG',
    component: () => import( /* webpackChunkName: "SVG" */ '@/views/SVG'),
    children: [{
        path: '/PageJsonEditor',
        name: 'PageJsonEditor',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import( /* webpackChunkName: "about" */ '@/pages/PageJsonEditor/PageJsonEditor.vue')
    }]
}