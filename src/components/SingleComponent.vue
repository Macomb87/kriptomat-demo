<template>
  <v-card color="primary" class="rounded-xl" flat elevation="0">

    <v-list-item two-line>

      <v-list-item-avatar height="61" width="61">
        <v-img width="61" height="61" :src="currency.image"></v-img>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title><h2>{{ currency.name }}</h2></v-list-item-title>
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
            <v-icon :style="{color: this.currency.favorite ?  '#F7941D':'#323232' }">
              {{ this.currency.favorite ?   'mdi-star': 'mdi-star-outline'  }}
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
          }}</strong> </span>
          <span class="price_24_high "> 24h High <strong>€{{
              currency?.high_24h | fixedNumber
            }}</strong></span></v-list-item-action-text>
      </v-list-item-action>
    </v-list-item>
    <chart-component :cryptoId="cryptoId"></chart-component>
  </v-card>
</template>

<script>
import chartComponent from "@/components/ChartComponent";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "SingleComponent",
  props: ['currency', 'cryptoId', 'changeColor', 'bearMarket'],
  components: {
    'chart-component': chartComponent
  },
  async mounted() {

  },
  computed: {
    ...mapGetters('favoritesStore', ['favoritesList']),
  },
  data() {
    return {
      isFavorite: false
    }
  },
  methods: {
    ...mapActions('favoritesStore', ["addFavorites", "getFavoriteById", "removeFavorites"]),

    async toggleFavorite() {
      this.currency.favorite = !this.currency.favorite;
      if (await this.getFavoriteById(this.currency.id)) {
        await this.removeFavorites(this.currency.id);
      } else {
        await this.addFavorites(this.currency)
      }

    },

  }
}
</script>

<style scoped lang="scss">
.price_change {
  p {
    padding: 0px;
    margin: 0px;
  }

}
</style>
