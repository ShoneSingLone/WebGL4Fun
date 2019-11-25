import SVG from '@/views/SVG';
export default {
    path: '/svg',
    name: 'SVG',
    component: SVG,
    children: [{
        path: 'example4',
        name: 'example4',
        component: () => import( /* webpackChunkName: "chart.example" */ '@/views/SVG/example4.vue')
    }]
}