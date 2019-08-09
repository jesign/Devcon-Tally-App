<template>
  <div id="app" style="max-width:678px; margin:0 auto;">
	<div>
		<b-navbar toggleable="lg" type="dark" variant="info">
			<b-navbar-brand @click.prevent="back">
				<font-awesome-icon 
					icon="chevron-left" 
					v-show="$store.getters.backUrl" 
					@click.prevent="back" 
					class="mr-2" 
				/> 
				{{ title }}
			</b-navbar-brand>
			<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
			<b-collapse id="nav-collapse" is-nav>
				<!-- Right aligned nav items -->
				<b-navbar-nav class="ml-auto" v-if="$store.getters.isLoggedIn">
					<li class="nav-item">
						<router-link to="/" class="nav-link">Home</router-link>
					</li>
					<li class="nav-item">
						<router-link to="/events" class="nav-link">Events</router-link>
					</li>
					<li class="nav-item" v-if="!isAdmin">
						<router-link to="/participants" class="nav-link">Tally</router-link>
					</li>
                    <li class="nav-item" v-if="this.$store.getters.event.id">
                        <router-link to="/leaderboard" class="nav-link">Leaderboard</router-link>
                    </li>
					<li class="nav-item" v-if="isAdmin">
						<router-link to="/judges" class="nav-link">Judges</router-link>
					</li>
					<li class="nav-item">
						<a href="#" @click.prevent="logout" class="nav-link">Logout</a>
					</li>
				</b-navbar-nav>
			</b-collapse>
		</b-navbar>
	</div>
	<b-container fluid>
		<b-row>
			<b-col>
				<router-view />
			</b-col>
		</b-row>
	</b-container>

	</div>
</template>
<script>
	import AuthService from './services/AuthService';
	import _isEmpty from 'lodash/isEmpty'
	import axios from 'axios'

    export default {
    	data() {
    		return {
    			
    		}
    	},
		computed: {
			title () {
				if (_isEmpty(this.$store.getters.event)) {
					return 'Devcon Tally App'
				}

				return this.$store.getters.event.title	
			},
			isAdmin() {
				return AuthService.isAdmin();
			}
		},

        methods: {
        	back() {
        		if (!this.$store.getters.backUrl) return;

				this.$router.push(this.$store.getters.backUrl); 
				this.$store.commit('setBackUrl', '')
				this.$store.commit('setEvent', {})
        	},
        	logout() {
				axios.post(process.env.VUE_APP_API_URL + '/api/logout')
					.then(response => {
						
					this.$store.commit('updateLoggedInStatus', false);
					this.$store.commit('setEvent', {});
					this.$store.commit('setUser', {});

					localStorage.loginToken = '';
					localStorage.userRoles = '';

					// reload to refresh data
					location.href = '/login'

				});
        	},
        }
    }
</script>

<style lang="scss">

</style>
