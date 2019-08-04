import store from '../store'

import RestApiHandler from '../helpers/RestApiHandler.js'
let ApiHandler = new RestApiHandler;

let api =  ApiHandler.setService('/api/user')

const AuthService = {
	init() {
		api.index()
			.then(response => {
				store.commit('setUser', response.data.user)
				store.commit('updateLoggedInStatus', true)
		})
	},

	validateRoute(to) {
		if (!store.getters.user.roles.includes(to.meta.role)) {
			next('/') 
		 }
	}
}

export default AuthService;