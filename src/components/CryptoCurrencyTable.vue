<template>
  <div>
    <div class="hidden-md-and-up">
      <v-text-field class="mx-3" flat label="Search" prepend-inner-icon="mdi-magnify" solo-inverted v-model="search"
                    clearable @click:clear="clearSearch"></v-text-field>
      <template v-for="item in filteredTasks">
        <v-list-item>
          <v-list-item-content>
            <v-list-item>
              Coin
            </v-list-item>
          </v-list-item-content>
        </v-list-item>
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

    <div class="set_padding hidden-sm-and-down">
      <v-card class="rounded-xl" color="primary" elevation="0">
        <v-card-title>
          <h3 class="hidden-sm-and-down">
            Cryptocurrency Prices
          </h3>
          <v-spacer></v-spacer>
          <v-text-field
              outlined
              solo-inverted
              class="custom-input-colors"
              v-model="search"
              prepend-inner-icon="mdi-magnify"
              append-icon="mdi-close"
              @click:append="clear"
              label="Search"
              single-line
              hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
            elevation="0"
            loading="true"
            class="primary"
            :headers="headers"
            :items="cryptoCurrenciesArray"
            :search="search">

          <template v-slot:item.name="{ item }">
            <div class="crypto-header-name cursor" @click="handleClick(item)">
              <v-img max-height="30" max-width="30" :src="item.image"></v-img>
              <div class="text">

                <strong>{{ item.name }}</strong> <span class="symbol"> {{ String(item.symbol).toUpperCase() }}</span>
              </div>
            </div>
          </template>
          <template v-slot:item.price_change_percentage_24h_in_currency="{ item }">
            <div @click="handleClick(item)" class="cursor">
              <daily-change-row
                  :price_change_percentage="item.price_change_percentage_24h_in_currency | fixedNumber"></daily-change-row>
            </div>
          </template>
          <template v-slot:item.current_price="{ item }">
            <div @click="handleClick(item)" class="cursor">
              €{{ item.current_price | fixedNumber }}
            </div>
          </template>

          <template v-slot:item.favorite="{item}" class="d-inline-flex">

            <v-btn text elevation="0" class="mx-2" small @click="toggleFavorite(item)">
              <v-icon :style="{color: item.favorite ? '#F7941D' : '#323232'}">
                {{ item.favorite ? 'mdi-star' : 'mdi-star-outline' }}
              </v-icon>
            </v-btn>

          </template>

        </v-data-table>
      </v-card>
    </div>
  </div>
</template>
<style lang="scss">
.v-data-table-header {
  tr {
    cursor: pointer !important;
  }
}

.custom-input-colors {
  border-color: unset !important;
  color: unset !important;
}

.set_padding {
  padding: 36px;
}

.cursor {
  cursor: pointer;
}

.symbol {
  color: #707070;
}

.crypto-header-name {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  gap: 9px;

}

.v-data-table__wrapper {
  tbody {
    background-color: white;
  }

  .v-data-table-header {
    background-color: #0E80D5;

    th {
      color: white !important;

      .v-data-table-header__icon {
        color: white !important;
      }
    }
  }

}


</style>
<script>
import DailyChangeRow from "@/components/dailyChangeRow";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "CryptoCurrencyTable",
  components: {DailyChangeRow},
  async mounted() {
    await this.loadCryptoCurrencies();
    this.cryptoCurrenciesArray.map(async currency => {
      const isFavorite = await this.checkForFavorite(currency.id)
      currency.favorite = !!isFavorite;
      return currency
    })
  },
  computed: {
    ...mapGetters('favoritesStore', ['favoritesList']),
    ...mapGetters('currenciesStore', ['cryptoCurrenciesList']),
    filteredTasks() {
      //filter to only show items matching search string
      return this.cryptoCurrenciesList.filter(x => {
        return x.name.toLowerCase().includes(this.search.toLowerCase())
      });
    },
    cryptoCurrenciesArray() {
      return this.cryptoCurrenciesList.map(currency => {
        return {...currency, favorite: false};
      })
    }
  },
  methods: {
    ...mapActions('favoritesStore', ["addFavorites", "getFavoriteById", "removeFavorites"]),
    ...mapActions('currenciesStore', ["getAllCurrencies"]),
    openSingle(item) {
      this.$router.push({path: `/${item.id}`, replace: true})
    },
    clearSearch() {
      this.search = "";
    },
    async loadCryptoCurrencies() {
      await this.getAllCurrencies();
    },
    async toggleFavorite(item) {
      if (await this.getFavoriteById(item.id)) {
        await this.removeFavorites(item.id);
        item.favorite = false;
      } else {
        await this.addFavorites(item)
        item.favorite = true;
      }
    },

    async checkForFavorite(id) {
      const isFav = await this.getFavoriteById(id);
      if (isFav) {
        return this.favoritesList.filter(item => {
          return item.id === id
        });
      } else {
        return false;
      }
    },
    handleClick(e) {
      this.$router.push({path: `/${e.id}`, replace: true})
    },
    clear() {
      this.search = '';
    }
  },
  data() {
    return {
      search: '',
      headers: [
        {
          text: 'Currency',
          align: 'start',
          sortable: true,
          value: 'name',
        },
        {text: '24h %', value: 'price_change_percentage_24h_in_currency'},
        {text: 'Price', value: 'current_price', sortable: false},
        {text: 'Favorite', value: 'favorite', sortable: false, align: 'd-none d-lg-table-cell'},
      ],
      cryptoCurrencies: [],
    }
  },
}
</script>

