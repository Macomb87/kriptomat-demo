<template>
  <div>
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
    <v-divider></v-divider>
    <v-card class="rounded-xl" flat color="primary" elevation="0">
      <v-card-text>
        <v-chip-group
            class="chip-group-space"
            color="blue"
            v-model="selection"
            active-class="activated-chip "
            column>
          <v-chip value="24h">24h</v-chip>
          <v-chip value="1W">1W</v-chip>
          <v-chip value="1M">1M</v-chip>
          <v-chip value="1Y">1Y</v-chip>
          <v-chip value="ALL">ALL</v-chip>
        </v-chip-group>
      </v-card-text>
      <div class="center_position">
        <v-btn class="custom-button" color="secondary">
          <span class="mr-2">Buy, Sell or Exchange Bitcoin</span>
        </v-btn>
      </div>
    </v-card>
  </div>
</template>

<script>
import coinGeckoService from "@/services/coinGecko.service";
import moment from 'moment'

export default {
  name: "ChartComponent",
  props: ['cryptoId'],
  mounted() {
    const startdate = moment();
    this.selection = '1M'; //default selected time
    this.loadChart(startdate.subtract(1, 'months').unix(), moment().unix());
  },
  methods: {
    async loadChart(from, to) {
      const data = await coinGeckoService.getCryptoRange(this.cryptoId, from, to);
      this.value = data?.prices.map(price => {
        return price[1];
      })
    }
  },
  watch: {
    'cryptoId': function (cryptoId) {
      const startdate = moment();
      this.selection = '1M';
      this.loadChart(startdate.subtract(1, 'months').unix(), moment().unix());
    },
    'selection': function (selection) {
      const startdate = moment();
      switch (selection) {
        case '24h':
          this.loadChart(startdate.subtract(1, 'day').unix(), moment().unix());
          break;
        case '1M':
          this.loadChart(startdate.subtract(1, 'months').unix(), moment().unix());
          break;
        case '1W':
          this.loadChart(startdate.subtract(1, 'weeks').unix(), moment().unix());
          break;
        case '1Y':
          this.loadChart(startdate.subtract(1, 'years').unix(), moment().unix());
          break;
        case 'ALL':
          break;
        default:
          this.loadChart(startdate.subtract(1, 'months').unix(), moment().unix());
          break;
      }
    }
  },
  data: () => ({
        selection: null,
        fill: true,
        selectedGradient: ['#085FAD'],
        padding: 5,
        radius: 5,
        value: [],
        width: 0.25,
      }
  ),
}
</script>

<style lang="scss">
.theme--light.v-chip:not(.v-chip--active) {
  color: #0E80D5;
  background-color: unset;
}

.activated-chip {
  background-color: #0E80D5;
  color: white !important;
}

.chip-group-space {
  .v-slide-group__content {
    justify-content: space-evenly;
  }
}

.center_position {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-around;
  align-items: center;

  .custom-button {
    margin-bottom: 45px;
  }
}
</style>
