export default {
    path: '/ThreeJS',
    name: 'ThreeJS',
    component: () => import( /* webpackChunkName: "ThreeJS" */ '@/views/ThreeJS'),
    children: [{
        path: 'example1',
        name: 'ThreeJS.example1',
        component: () => {
            return import( /* webpackChunkName: "ThreeJS.example1" */ '@/views/ThreeJS/example1');
        }
    }, {
        path: 'example2',
        name: 'ThreeJS.example2',
        component: () => import( /* webpackChunkName: "ThreeJS.example2" */ '@/views/ThreeJS/example2')
    }, {
        path: 'example3',
        name: 'OrthographicCamera',
        component: () => import( /* webpackChunkName: "ThreeJS.example3" */ '@/views/ThreeJS/example3')
    }, {
        path: 'example4',
        name: 'Perspective',
        component: () => import( /* webpackChunkName: "ThreeJS.example4" */ '@/views/ThreeJS/example4')
    }, {
        path: 'example5',
        name: '几何Geometry',
        component: () => import( /* webpackChunkName: "ThreeJS.example5" */ '@/views/ThreeJS/example5')
    }, {
        path: 'example6',
        name: '材质Material',
        component: () => import( /* webpackChunkName: "ThreeJS.example6" */ '@/views/ThreeJS/example6')
    }, {
        path: 'example7',
        name: '网格Mesh',
        component: () => import( /* webpackChunkName: "ThreeJS.example7" */ '@/views/ThreeJS/example7')
    }, {
        path: 'example8',
        name: '动画',
        component: () => import( /* webpackChunkName: "ThreeJS.example8" */ '@/views/ThreeJS/example8')
    }]
}