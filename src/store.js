import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

let cacheEvent = localStorage.event || '{}';

export default new Vuex.Store({
	state: {
		event: JSON.parse(cacheEvent)
	},
	mutations: {
		setEvent(state, event){
			state.event = event;
			localStorage.event = JSON.stringify(event);
		}
	},
	actions: {},
	getters: {
		event: state => state.event
	}
});
