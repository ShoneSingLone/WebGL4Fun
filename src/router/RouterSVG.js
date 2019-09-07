export default {
    path: '/svg',
    name: 'SVG',
    component: () => import( /* webpackChunkName: "SVG" */ '@/views/SVG'),
    children: [{}]
}