<template>
  <div id="app">
	  <div>
		  <b-navbar toggleable="lg" type="dark" variant="info">
			  <b-navbar-brand href="#" v-text="$store.getters.event.title"></b-navbar-brand>
			  <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
			  <b-collapse id="nav-collapse" is-nav>
				  <!-- Right aligned nav items -->
				  <b-navbar-nav class="ml-auto">
					  <li class="nav-item"><router-link to="/" class="nav-link">Home</router-link></li>
					  <li class="nav-item"><router-link to="/events" class="nav-link">Events</router-link></li>
					  <li class="nav-item"><router-link to="/participants" class="nav-link">Tally</router-link></li>
					  <li class="nav-item"><router-link to="/settings" class="nav-link">Settings
                      </router-link></li>
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
        computed : {
            
        }
    }
</script>

<style lang="scss">

</style>
