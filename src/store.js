import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

let cacheEvent = localStorage.event || {};

export default new Vuex.Store({
	state: {
		event: JSON.parse(cacheEvent),
		user: {},
		backUrl: '',
		isLoggedIn: false
	},
	mutations: {
		setEvent(state, event){
			state.event = event;
			localStorage.event = JSON.stringify(event);
		},
		setUser(state, user){
			state.user = user;
		},
		setBackUrl(state, backUrl){
			state.backUrl = backUrl;
		},
		updateLoggedInStatus(state, isLoggedIn) {
			state.isLoggedIn = isLoggedIn;
		}
	},
	actions: {},
	getters: {
		event: state => state.event,
		user: state => state.user,
		backUrl: state => state.backUrl,
		isLoggedIn: state => state.isLoggedIn,
	}
});
