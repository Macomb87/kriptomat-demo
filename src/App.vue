<template>
  <v-app>
    <router-view/>
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
