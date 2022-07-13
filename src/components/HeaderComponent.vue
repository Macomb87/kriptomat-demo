<template>
  <v-app-bar height="90px"
             elevation="0"
             app
             color="primary">
    <div class="d-flex align-center">
      <router-link to="/">
        <v-img src="../assets/logo.svg"></v-img>
      </router-link>
    </div>
    <v-spacer></v-spacer>
    <v-btn class="custom-button" color="secondary">
      <span class="mr-2">Kriptomat account</span>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "HeaderComponent"
}
</script>

<style scoped>

</style>
