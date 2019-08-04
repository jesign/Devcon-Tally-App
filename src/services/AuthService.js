import store from '../store'

import RestApiHandler from '../helpers/RestApiHandler.js'
let ApiHandler = new RestApiHandler;

let api =  ApiHandler.setService('/api/user')

const AuthService = {
	init () {
		AuthService.getUser()
			.then(response => {
				store.commit('setUser', response.data.user)
				store.commit('updateLoggedInStatus', true)
		})
	},

	getUser() {
		return api.index()
	},

	validateRoute(to, callback) {
		let userRoles = ( localStorage.userRoles ) ? localStorage.userRoles : store.getters.user.roles

		if (userRoles.includes(to.meta.role)) {
			callback(true)
		} else {
			callback(false)
		}
	},

	isAdmin() {
		let userRoles = ( localStorage.userRoles ) ? localStorage.userRoles : store.getters.user.roles

		if (userRoles.includes('admin')) {
			return true
		} 

		return false
	}
}

export default AuthService;