<template>
  <div v-if="cryptoId">
    <v-card class="mobile-single-view-header  hidden-md-and-up" color="primary" flat elevation="0">
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
        <v-list-item-action class="price_change ">

          <v-chip
              :color="changeColor"
              label
              outlined>
            <v-avatar width="12" height="12" left>
              <daily-change-row :price_change_percentage="currency.price_change_percentage"></daily-change-row>
            </v-avatar>
            <p class="text"> {{
                currency.price_change_percentage_24h_in_currency | fixedNumber
              }}%</p>
          </v-chip>
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
            <pre> ?</pre>
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
            <small> <strong>{{ currency.circulating_supply }} {{ currency.symbol.toUpperCase() }}</strong></small>
          </v-card>
        </v-col>
      </v-row>
    </v-card>


    <v-card color="primary" class="rounded-xl hidden-sm-and-down" flat elevation="0">
      <v-list-item two-line>
        <v-list-item-avatar height="61" width="61">
          <v-img width="61" height="61" :src="currency.image"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="hidden-sm-and-down"><h2>{{ currency.name }}</h2></v-list-item-title>
          <v-list-item-subtitle class="price_change ">
            <v-chip
                :color="changeColor"
                label
                outlined>
              <v-avatar width="12" height="12" left>
                <v-img v-if="bearMarket === true" class="arrow-image"
                       max-height="12" max-width="12" src="../assets/small_arrow_down.png"></v-img>
                <v-img v-else class="arrow-image"
                       max-height="12" max-width="12" src="../assets/small_arrow_up.png"></v-img>
              </v-avatar>
              <p class="text"> {{
                  currency.price_change_percentage_24h_in_currency | fixedNumber
                }}%</p>
            </v-chip>
            <v-btn text elevation="0" class="mx-2 " small @click="toggleFavorite(currency)">
              <v-icon :style="{color: currency.favorite ? '#F7941D' : '#323232'}">
                {{ currency.favorite ? 'mdi-star' : 'mdi-star-outline' }}
              </v-icon>
            </v-btn>
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-list-item-action-text><h2 class="current_price ">€ {{
              currency?.current_price | fixedNumber
            }}</h2></v-list-item-action-text>

          <v-list-item-action-text class="price_high_low "><span
              class="price_24_low"> 24h Low <strong>€{{
              currency?.low_24h | fixedNumber
            }}</strong> </span> <span
              class="price_24_high "> 24h High <strong>€{{
              currency?.high_24h | fixedNumber
            }}</strong></span></v-list-item-action-text>
        </v-list-item-action>
      </v-list-item>
      <chart-component :cryptoId="cryptoId"></chart-component>


    </v-card>
  </div>

  <div v-else>
    <v-card class="rounded-xl" flat elevation="0">
      <h1> there is no symbol</h1>
    </v-card>

  </div>
</template>
<style lang="scss">
.header {
  display: flex;
}

.current_price {
  font-size: 28px;
}
</style>
<script>
import ChartComponent from "@/components/ChartComponent";
import {mapActions} from "vuex";

export default {
  name: "SingleView",
  components: {ChartComponent},
  data() {
    return {
      cryptoId: '',
      prices: [],
      currency: [],
      bearMarket: false,
      changeColor: '',
    }
  },
  watch: {
    '$route.params.cryptoId': function (cryptoId) {
      this.cryptoId = cryptoId;
      this.loadCryptoCurrency();
    }
  },
  methods: {
    ...mapActions('favoritesStore', ["addFavorites", "getFavoriteById", "removeFavorites"]),
    ...mapActions('currenciesStore', ["getCurrencyById"]),
    goBack() {
      this.$router.back();
    },
    async toggleFavorite() {
      if (await this.getFavoriteById(this.currency.id)) {
        await this.removeFavorites(this.currency.id);
        this.currency.favorite = false;
      } else {
        await this.addFavorites(this.currency)
        this.currency.favorite = true;
      }
    },
    async loadCryptoCurrency() {
      this.currency = await this.getCurrencyById(this.cryptoId);
      if (this.currency.price_change_percentage_24h_in_currency < 0) {
        this.bearMarket = true;
        this.changeColor = '#FF9696';
      } else {
        this.bearMarket = false;
        this.changeColor = '#4CB294';
      }
    },
  },

  mounted() {
    this.cryptoId = this.$route.params?.cryptoId;
    this.loadCryptoCurrency();
  }
}
</script>

<style scoped lang="scss">
.mobile-single-view-header {
  .v-list-item__icon {
    margin-right: 5px;
  }
}

.v-slide-group__content {
  justify-content: space-around !important;
}

.mobile_currency_price {
  font-size: 28px;
}

.low_high_small {
  gap: 10px;
  font-size: 12px;
  display: flex;
}

.price_high_low {
  display: flex;
  gap: 10px;
}

.arrow-image {
  border-radius: unset;
  display: inline-flex;
  height: unset;
  width: unset;
}
</style>
