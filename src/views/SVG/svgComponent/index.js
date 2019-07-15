let target = {};
['Cat', 'Cat2', 'H', 'Text'].forEach((name) => {
    target['svg-' + name.toLowerCase()] = () => import( /* webpackChunkName: "chart.example" */ `./${name}.vue`);
})
export default target;