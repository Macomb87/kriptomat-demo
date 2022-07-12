<template>
  <div>
    <h3>Favorites</h3>
    <template v-for="item in favoritesList">
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
import {
  mapGetters
} from "vuex";

export default {
  name: "FavoritesComponent",
  mounted() {

  },
  data: () => ({

    selectedItem: 1,
    items: []
  }),
  computed: {
    ...mapGetters('favoritesStore', ['favoritesList']),
  },
  methods: {
    openSingle(item) {
      this.$router.push({path: `/${item.id}`, replace: true})
    }
  },

}
</script>

<style scoped lang="scss">
hr:last-child {
  padding-bottom: 40px;
}

h3 {
  display: flex;
  flex-direction: row;
  justify-content: center;

  padding: 15px 0 15px 0;
}

.v-list-item {
  &__action {
    &-text {
      font-size: 14px;

      &.price_change {

        &.percentage_up {
          color: #0DEAA9;
        }

        &.percentage_down {
          color: #FF9696;
        }
      }
    }
  }

}


</style>
