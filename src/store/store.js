import Vue from 'vue'
import Vuex from 'vuex'
import Favorites from "@/store/modules/favorites";
import Currencies from "@/store/modules/cryptoCurencies";

Vue.use(Vuex)
export default new Vuex.Store({
    namespaced: true,
    state: {
        isMobile: false,
    },
    mutations: {
        updateIsMobile: (state, isMobile) => state.isMobile = isMobile,
    },
    actions: {
        checkIfMobile({commit}) {
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            console.log(isMobile);
            commit('updateIsMobile', isMobile);
        }
    },
    getters: {
        isMobile: state => state.isMobile
    },
    modules: {
        'favoritesStore': Favorites,
        'currenciesStore': Currencies
    }
})
