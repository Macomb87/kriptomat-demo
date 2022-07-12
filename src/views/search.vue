<template>
  <div>
    <v-list>
      <v-list-item>
        <v-list-item-icon @click="goBack()">
          <v-icon>mdi-arrow-left</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title class="ml-2"><h3>Search</h3></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

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
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "search",
  components: {},

  computed: {
    ...mapGetters('currenciesStore', ['cryptoCurrenciesList']),
    filteredTasks() {
      //filter to only show items matching search string
      return this.cryptoCurrenciesList.filter(x => {
        console.log(x);
        return x.name.toLowerCase().includes(this.search.toLowerCase())
      });
    }
  },
  methods: {
    goBack() {
      this.$router.back();
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
      search: ''
    }
  }
}
</script>

<style scoped>

</style>
