import coinGeckoService from "@/services/coinGecko.service";

const state = {
    currencies: []
};
const getters = {
    cryptoCurrenciesList: state => state.currencies
};
const actions = {
    async getAllCurrencies({commit}) {
        const currencies = await coinGeckoService.getCryptoCurrencies();
        commit('SET_DATA', currencies);
    },
    async getCurrencyById({state,commit}, currencyId) {
        //load on refresh page
        if (state.currencies.length === 0) {
            const currencies = await coinGeckoService.getCryptoCurrencies();
            commit('SET_DATA', currencies);
        }
        return state.currencies.find(item => item.id === currencyId)
    }
};
const mutations = {
    SET_DATA(state, data) {
        state.currencies = data;
    },
};
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
