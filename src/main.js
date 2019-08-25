import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import './registerServiceWorker'
import '@/polyfill/requestAnimationFrame';
import 'reset-css';
import '@/assets/animate.css';
import './plugins/element.js';
import './app.scss';
import "@/utils/WebGL.js";
window.Vue = Vue;
Vue.config.productionTip = false

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