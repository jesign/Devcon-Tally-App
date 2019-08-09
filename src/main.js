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

import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronLeft, faPlusCircle, faCheck, faCog } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faChevronLeft, faPlusCircle, faCheck, faCog)
Vue.component('font-awesome-icon', FontAwesomeIcon)


import RestApiHandler from './helpers/RestApiHandler.js'
window.RestApiHandler = new RestApiHandler()

import AuthService from "./services/AuthService.js";

import VueSwal from 'vue-swal';
Vue.use(VueSwal);

import _ from 'lodash';
Vue.use(_);

import Multiselect from 'vue-multiselect'
Vue.component('multiselect', Multiselect)

new Vue({
  router,
  store,
  render: h => h(App),

  created() {
    AuthService.init()
  }
}).$mount("#app");
