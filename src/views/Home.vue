<template>
  <div class="home">
      <b-row>
          <b-col class="pt-5">
              <img id="img-logo" src="../assets/devco_logo_black.png" alt="">
              <h3>Tally app for Devcon events</h3>
              <b-button class="mt-3" variant="success">Go to events</b-button>
          </b-col>
      </b-row> 
    <!--<img alt="Vue logo" src="../assets/logo.png" />-->
    <!--<HelloWorld msg="Welcome to Your Vue.js App" />-->
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  components: {
    HelloWorld
  }
};
</script>
<style>
    #img-logo {
        max-width: 100%;
    }
</style>
