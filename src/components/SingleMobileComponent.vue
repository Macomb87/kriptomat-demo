<template>
  <v-card class="mobile-single-view-header" color="primary" flat elevation="0">
    <v-list-item>
      <v-list-item-icon @click="goBack()">
        <v-icon>mdi-arrow-left</v-icon>
      </v-list-item-icon>
      <v-list-item-avatar height="25" min-width="25" width="25">
        <v-img width="25" height="25" :src="currency.image"></v-img>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="ml-2"><h3>{{ currency.name }}</h3></v-list-item-title>
      </v-list-item-content>
      <v-list-item-action>
        <router-link to="/search">
          <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </router-link>
      </v-list-item-action>
    </v-list-item>

    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="ml-2 mobile_currency_price"><h3>€ {{ currency.current_price }}</h3>
        </v-list-item-title>
      </v-list-item-content>
      <v-list-item-action class="price_change">
        <price-change-chip-component :bear-market="bearMarket" :price_change_percentage_24h_in_currency="currency.price_change_percentage_24h_in_currency"
                              :color="changeColor"></price-change-chip-component>
      </v-list-item-action>
    </v-list-item>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="ml-2 low_high_small">
          <span class="price_24_low"> 24h Low <strong>€{{ currency?.low_24h | fixedNumber }}</strong> </span>
          <span class="price_24_high "> 24h High <strong>€{{ currency?.high_24h | fixedNumber }}</strong></span>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <chart-component :cryptoId="cryptoId"></chart-component>
    <h3>Overview</h3>

    <v-row no-gutters>
      <v-col>
        <v-card
            class="pa-2"
            outlined
            tile>
          <small>Volume (1d)</small>
          <br>
          <small><strong> €{{ total1dayVolume }}</strong></small>
        </v-card>
      </v-col>
      <v-col>
        <v-card
            class="pa-2"
            outlined
            tile>
          <small>Market Cap:</small>
          <br>
          <small><strong> €{{ currency.market_cap }}</strong></small>
        </v-card>
      </v-col>
    </v-row>
    <v-row no-gutters>

      <v-col>
        <v-card
            class="pa-2"
            outlined
            tile>
          <small>Circulating supply:</small>
          <br>
          <small> <strong>{{ currency.circulating_supply }} {{ currency.symbol?.toUpperCase() }}</strong></small>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import ChartComponent from "@/components/ChartComponent";
import coinGeckoService from "@/services/coinGecko.service";
import moment from "moment";
import PriceChangeChipComponent from "@/components/PriceChangeChipComponent";

export default {
  name: "SingleMobileComponent",
  props: ['currency', 'cryptoId', 'changeColor', 'bearMarket'],
  components: {
    'price-change-chip-component': PriceChangeChipComponent,
    'chart-component': ChartComponent
  },
  data() {
    return {
      total1dayVolume: 0,
    }
  },
  mounted() {
    this.get1DayVolumen();
  },
  methods: {
    async get1DayVolumen() {
      const startdate = moment();
      const volume = await coinGeckoService.getDailyVolume(this.cryptoId, startdate.subtract(1, 'day').unix(), moment().unix());
      this.total1dayVolume = volume?.total_volumes[0][1];

    },
    goBack() {
      this.$router.back();
    },
  }
}
</script>

<style scoped>

</style>
