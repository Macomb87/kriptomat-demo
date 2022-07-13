const state = {
    favorites: []
};
const getters = {
    favoritesList: state => state.favorites
};
const actions = {
    addFavorites({commit}, favorite) {
        console.log('add favorite');
        console.log(favorite);
        commit("addNewFavorite", favorite)
    },
    removeFavorites({commit}, favoriteId) {
        commit("removeFavorite", favoriteId)
    },
    getFavoriteById({state}, favoriteId) {
        return state.favorites.find(item => item.id === favoriteId)
    },
};
const mutations = {
    addNewFavorite: (state, favorite) => state.favorites.push(favorite),
    removeFavorite: (state, id) => {
        state.favorites.filter((favorite, index) => {
            if (favorite.id === id) {
                state.favorites.splice(index,1);
            }
        })
    }

};
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
