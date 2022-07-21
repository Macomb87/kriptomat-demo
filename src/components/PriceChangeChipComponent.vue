<template>
  <v-chip
      :color="color"
      label
      outlined>
    <v-avatar width="12" height="12" left>
      <v-icon v-if="bearMarket === true" style="color:#FF9696">mdi-menu-down</v-icon>
      <v-icon v-else style="color:#0DEAA9">mdi-menu-up</v-icon>
    </v-avatar>
    <p class="text"> {{
        price_change_percentage_24h_in_currency | fixedNumber
      }}%</p>
  </v-chip>
</template>

<script>
export default {
  props: ['color', 'bearMarket', 'price_change_percentage_24h_in_currency'],
  name: "PriceChangeChipComponent"
}
</script>

<style scoped>

</style>
