import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from "vue";
import './plugins/bootstrap-vue'

import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

import 'bootstrap-vue/dist/bootstrap-vue.css'
import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)


import RestApiHandler from './helpers/RestApiHandler.js'
window.RestApiHandler = new RestApiHandler()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
