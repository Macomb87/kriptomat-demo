import Vue from 'vue'
import Vuex from 'vuex'
import Favorites from "@/store/modules/favorites";
import Currencies from "@/store/modules/cryptoCurencies";

Vue.use(Vuex)
export default new Vuex.Store({
    namespaced: true,
    state: {},
    mutations: {},
    actions: {},
    getters: {},
    modules: {
        'favoritesStore': Favorites,
        'currenciesStore': Currencies
    }
})
