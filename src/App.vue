<template>
  <v-app>
    <v-container>
      <v-app-bar
          height="90px"
          elevation="0"
          app
          color="primary"
      >
        <div class="d-flex align-center">
          <img src="./assets/logo.svg" alt="kriptomat_logo" class="v-responsive">
        </div>

        <v-spacer></v-spacer>

        <v-btn class="custom-button" color="secondary">
          <span class="mr-2">Kriptomat account</span>

        </v-btn>
      </v-app-bar>

      <v-main>
        <router-view/>
      </v-main>
    </v-container>
  </v-app>
</template>

<script>

import ButtonComponent from "@/components/ButtonComponent";

export default {
  name: 'App',
  components: [
    ButtonComponent
  ],
  data: () => ({
    //
  }),
};
</script>

<style lang="scss">
@import "style";
</style>
