<template>
  <div id="app">
	<div>
		<b-navbar toggleable="lg" type="dark" variant="info">
			<b-navbar-brand @click.prevent="back">
				<font-awesome-icon 
					icon="chevron-left" 
					v-show="$store.getters.backUrl" 
					@click.prevent="back" 
					class="mr-2" 
				/> 
				{{ $store.getters.event.title }}
			</b-navbar-brand>
			<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
			<b-collapse id="nav-collapse" is-nav>
				<!-- Right aligned nav items -->
				<b-navbar-nav class="ml-auto">
					<li class="nav-item">
						<router-link to="/" class="nav-link">Home</router-link>
					</li>
					<li class="nav-item">
						<router-link to="/events" class="nav-link">Events</router-link>
					</li>
					<li class="nav-item">
						<router-link to="/participants" class="nav-link">Tally</router-link>
					</li>
					<li class="nav-item">
						<router-link to="/settings" class="nav-link">Settings</router-link>
					</li>
					<li class="nav-item" v-if="$store.getters.isLoggedIn">
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

    export default {
        methods: {
        	back() {
        		if (!this.$store.getters.backUrl) return;

				this.$router.push(this.$store.getters.backUrl); 
				this.$store.commit('setBackUrl', '')
				this.$store.commit('setEvent', {})
        	},
        	logout() {
        		swal({
					title: "Are you sure?",
					icon: "warning",
					buttons: true,
					dangerMode: true,
				})
				.then((confirm) => {
					if (confirm) {
			    		localStorage.loginToken = '';
			    		this.$router.push('/login')
			    		this.$store.commit('updateLoggedInStatus', false);
					}
				});
        	},
        }
    }
</script>

<style lang="scss">

</style>
