<template>
  <div>
    <header-component></header-component>
    <v-main>
      <v-container>
        <v-row>
          <v-col sm="12" md="12" lg="8">
            <v-card class="rounded-xl" flat elevation="0" color="primary">
              <slot></slot>
            </v-card>
          </v-col>
          <v-col md="4" lg="4">
            <v-card class="rounded-xl" color="primary" flat elevation="0">
              <favorite-component></favorite-component>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

  </div>
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent";

export default {
  name: "MainLayout",
  components: {HeaderComponent}
}
</script>

<style scoped>

</style>
