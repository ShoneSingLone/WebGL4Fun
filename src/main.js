import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import '@/polyfill/requestAnimationFrame';
import 'reset-css';
import '@/assets/animate.css';
import './plugins/element.js';
import './app.scss';
import "@/plugins/stats.js";
import "@/utils/WebGL.js";


Vue.config.productionTip = false

THREE.fontCollection = {};

if (WEBGL.isWebGLAvailable()) {
  // Initiate function or other initializations here
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
} else {
  var warning = WEBGL.getWebGLErrorMessage();
  document.getElementById('app').appendChild(warning);
}