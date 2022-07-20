<template>
  <div class="mobile-table">
    <v-text-field class="mx-3" flat label="Search" prepend-inner-icon="mdi-magnify" solo-inverted v-model="search"
                  clearable @click:clear="clearSearch">
    </v-text-field>
    <v-list>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title @click="sort('name')"><strong>Coin</strong>
            <v-icon v-if="sortCoin && sortDirection ==='desc'">mdi-arrow-up</v-icon>
            <v-icon v-if="sortCoin && sortDirection ==='asc'">mdi-arrow-down</v-icon>

          </v-list-item-title>

        </v-list-item-content>
        <v-list-item-action>

          <v-list-item-title @click="sort('current_price')"><strong>Price</strong>
            <v-icon v-if="sortPrice && sortDirection ==='desc'">mdi-arrow-up</v-icon>
            <v-icon v-if="sortPrice && sortDirection ==='asc'">mdi-arrow-down</v-icon>
          </v-list-item-title>

        </v-list-item-action>
      </v-list-item>
    </v-list>
    <template v-for="item in filteredCurrencies">
      <v-list-item two-line :link="true" @click="openSingle(item)">
        <v-list-item-avatar>
          <v-img :src="item.image"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title><strong>{{ item.name }}</strong></v-list-item-title>
          <v-list-item-subtitle>{{ String(item.symbol).toUpperCase() }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-list-item-action-text><strong>€{{ item.current_price | fixedNumber }}</strong></v-list-item-action-text>
          <v-list-item-action-text class="price_change percentage_down">
            <daily-change-row
                :price_change_percentage="item.price_change_percentage_24h_in_currency"></daily-change-row>
          </v-list-item-action-text>
        </v-list-item-action>
      </v-list-item>
      <v-divider></v-divider>
    </template>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "MobileTableComponent",
  computed: {
    ...mapGetters('currenciesStore', ['cryptoCurrenciesList']),
    filteredCurrencies() {
      //filter to only show items matching search string
      const filteredList = this.cryptoCurrenciesList.filter(x => {
        return x.name.toLowerCase().includes(this.search?.toLowerCase())
      });

      return filteredList.sort((p1, p2) => {
        let modifier = 1;
        if (this.sortDirection === 'desc') modifier = -1;
        if (p1[this.sortBy] < p2[this.sortBy]) return -1 * modifier;
        if (p1[this.sortBy] > p2[this.sortBy]) return modifier;
        return 0;
      });
    },
  },
  methods: {
    sort(s) {
      if (s === this.sortBy) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      }
      switch (s) {
        case 'current_price':
          this.sortCoin = false;
          this.sortPrice = true;
          break;
        case 'name':
          this.sortCoin = true;
          this.sortPrice = false;
          break;
      }
      this.sortBy = s;
    },
    openSingle(item) {
      this.$router.push({path: `/${item.id}`, replace: true})
    },
    clearSearch() {
      this.search = "";
    },
  },
  data() {
    return {
      sortPrice: false,
      sortCoin: false,
      sortDirection: '',
      search: ''
    }
  }
}
</script>

<style scoped>
.mobile-table {
  padding-bottom: 80px;
}
</style>
