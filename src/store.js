import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

let cacheEvent = localStorage.event || '{}';

export default new Vuex.Store({
	state: {
		event: JSON.parse(cacheEvent),
		backUrl: '',
		participantId: null
	},
	mutations: {
		setEvent(state, event){
			state.event = event;
			localStorage.event = JSON.stringify(event);
		},
		setBackUrl(state, backUrl){
			state.backUrl = backUrl;
		},
		setParticipantId(state, participantId) {
			state.participantId = participantId;
		}
	},
	actions: {},
	getters: {
		event: state => state.event,
		backUrl: state => state.backUrl,
		participantId: state => state.participantId,
	}
});
