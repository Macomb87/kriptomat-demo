import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import VueAxios from 'vue-axios'
import '@/globalComponents'
import VueRouter from 'vue-router'
import store from "@/store/store";
import "./filters/filters";

Vue.config.productionTip = false
Vue.use(VueAxios, axios);
Vue.use(VueRouter);
console.log(store);
new Vue({
    store,
    router,
    vuetify,
    render: h => h(App)
}).$mount('#app')
