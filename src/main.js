import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import '@/polyfill/requestAnimationFrame';
import 'reset-css';
import './plugins/element.js';
import './app.scss';

Vue.config.productionTip = false

THREE.fontCollection = {};

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')