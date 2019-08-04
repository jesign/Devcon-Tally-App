<template>
	<b-row class="login mt-5">
		<b-col>
			<b-form @submit="onSubmit">
				<b-form-group
					id="input-group-1"
					label="Email Address"
					label-for="input-1"
				>
					<b-form-input
						id="input-1"
						v-model="form.email"
						type="email"
						required
					/>
	      		</b-form-group>

	      		<b-form-group 
	      			id="input-group-2" 
	      			label="Password" 
	      			label-for="input-2"
	      		>
			        <b-form-input
			        	type="password"
						id="input-2"
						v-model="form.password"
						required
			        />
		      	</b-form-group>

	      	 	<b-button type="submit" variant="success" :disabled="disableBtn">Login</b-button>
	      	</b-form>
		</b-col>
	</b-row>
</template>

<script>
	import axios from 'axios';
	export default {
		name: "login",
		data() {
			return {
				form: {
					email: '',
					password: ''
				},
				disableBtn: false
			}
		},
		methods: {
			onSubmit(evt) {
				evt.preventDefault();
				this.disableBtn = true;

				axios.post(process.env.VUE_APP_API_URL + '/api/login', this.form).then(response => {

					localStorage.loginToken = response.data.token;

					this.$store.commit('updateLoggedInStatus', true);
					this.$store.commit('setUser', response.data.user);
					this.$router.push('/admin/events');

				}).catch(response => {
					swal({
						icon: 'warning',
						text: 'Invalid Crendentials'
					});

					this.disableBtn = false;
				});
			}
		}
	};
</script>
