 let target = {};
 ['d1'].forEach((name) => {
     target['d3-' + name.toLowerCase()] = () => import( /* webpackChunkName: "chart.example" */ `./${name}.vue`);
 })
 export default target;
 //  export default {};