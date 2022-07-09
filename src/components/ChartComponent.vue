<template>
  <v-sparkline
      :fill="false"
      color="primary"
      :gradient="selectedGradient"
      :line-width="width"
      :padding="padding"
      :smooth="radius || false"
      :value="value"
      :label-size="5"
      :type="'trend'"
      :auto-line-width="true"
      auto-draw
  ></v-sparkline>
</template>

<script>
export default {
  name: "ChartComponent",
  mounted() {
    this.axios.get('https://api.coingecko.com/api/v3/coins/ripple/market_chart/range?vs_currency=eur&from=1392577232&to=1422577232').then((response) => {
      const data = response.data;
      this.value = data?.prices?.map(price => {
        return price[1];
      })
    })
  },
  data: () => ({
    prices: [],
    fill: true,
    selectedGradient: ['#085FAD'],
    padding: 5,
    radius: 10,
    value: [],
    width: 0.25,
  }),
}
</script>

<style scoped>

</style>
