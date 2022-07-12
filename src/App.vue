<template>
  <v-app>
    <v-app-bar
        class="hidden-sm-and-down"
        height="90px"
        elevation="0"
        app
        color="primary">
      <div class="d-flex align-center">
        <router-link to="/">
          <v-img src="./assets/logo.svg"></v-img>
        </router-link>
      </div>
      <v-spacer></v-spacer>
      <v-btn class="custom-button hidden-sm-and-down" color="secondary">
        <span class="mr-2">Kriptomat account</span>
      </v-btn>
    </v-app-bar>
    <div class="mobile-header hidden-md-and-up">
      <router-link to="/">
        <img src="./assets/logo.svg"/>
      </router-link>
    </div>
    <v-main>
      <v-container>
        <v-row>
          <v-col sm="12" md="12" lg="8">
            <v-card class="rounded-xl" color="primary" flat elevation="0">

              <router-view/>
            </v-card>
          </v-col>
          <v-col md="4" lg="4" class="hidden-sm-and-down">
            <v-card class="rounded-xl" color="primary" flat elevation="0">
              <favorite-component class="hidden-sm-and-down"></favorite-component>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-footer class="hidden-md-and-up">
      <v-col
          class="text-center"
          cols="12">
        <v-btn class="custom-button" color="secondary">
          <span class="mr-2">Kriptomat account</span>
        </v-btn>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    hide: false,
  }),
};
</script>

<style lang="scss">
@import "style";
</style>
