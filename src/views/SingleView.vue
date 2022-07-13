<template>
  <div v-if="cryptoId">
    <mobile-layout :hide-header="true" class="hidden-md-and-up">
      <single-mobile-component
          v-if="cryptoId"
          :cryptoId="cryptoId" :bear-market="bearMarket" :change-color="changeColor"
          :currency="currency"
          class="hidden-md-and-up"></single-mobile-component>
    </mobile-layout>

    <main-layout class="hidden-sm-and-down">
      <single-component v-if="cryptoId" :cryptoId="cryptoId" :bear-market="bearMarket" :change-color="changeColor"
                        :currency="currency"></single-component>
    </main-layout>

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
import SingleMobileComponent from "@/components/SingleMobileComponent";
import SingleComponent from "@/components/SingleComponent";
import MainLayout from "@/Layouts/MainLayout";
import MobileLayout from "@/Layouts/MobileLayout";

export default {
  name: "SingleView",
  components: {
    MobileLayout,
    MainLayout,
    SingleComponent,
    SingleMobileComponent,
    ChartComponent
  },
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
    ...mapActions('currenciesStore', ["getCurrencyById"]),
    ...mapActions('favoritesStore', ["getFavoriteById"]),
    goBack() {
      this.$router.back();
    },

    async loadCryptoCurrency() {

      this.currency = await this.getCurrencyById(this.cryptoId);
      const isFavorite = await this.getFavoriteById(this.currency.id);
      this.currency = {...this.currency, favorite: !!isFavorite}
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
