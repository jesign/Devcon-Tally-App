import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
      event: {}
  },
  mutations: {
      setEvent(state, event){
          state.event = event
      }
  },
  actions: {}
});
