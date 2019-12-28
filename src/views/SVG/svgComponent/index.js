let target = {};
['Cat', 'Cat2', 'H', 'Text', 'TagA','Elastic','Corner'].forEach((name) => {
    target['svg-' + name.toLowerCase()] = () => import( /* webpackChunkName: "chart.example" */ `./${name}.vue`);
})
export default target;