export default {
    path: '/animation',
    name: 'Vue过渡',
    component: () => import( /* webpackChunkName: "Animation" */ '@/views/Animation'),
    children: [{
        path: 'example1',
        name: '单元素/组件的过渡',
        component: () => import( /* webpackChunkName: "example1" */ '@/views/Animation/example1.vue')
    }, {
        path: 'example2',
        name: '列表的过渡',
        component: () => import( /* webpackChunkName: "example2" */ '@/views/Animation/example2.vue')
    }, {
        path: 'example3',
        name: '数组的过渡',
        component: () => import( /* webpackChunkName: "example3" */ '@/views/Animation/example3.vue')
    }]
}