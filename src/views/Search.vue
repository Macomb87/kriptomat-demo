<template>
  <mobile-layout :hide-header="true">
    <v-list>
      <v-list-item>
        <v-list-item-icon @click="goBack()">
          <v-icon>mdi-arrow-left</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="ml-2"><h3>Search</h3></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <MobileTableComponent></MobileTableComponent>
  </mobile-layout>

</template>

<script>
import MobileTableComponent from "@/components/MobileTableComponent";
import MobileLayout from "@/Layouts/MobileLayout";

export default {
  name: "Search",
  components: {MobileLayout, MobileTableComponent},

  computed: {},
  methods: {
    goBack() {
      this.$router.back();
    },
    openSingle(item) {
      this.$router.push({path: `/${item.id}`, replace: true})
    },
  },
  data() {
    return {
      search: ''
    }
  }
}
</script>

<style scoped>

</style>
