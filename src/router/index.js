import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import(/* webpackChunkName: "search" */ '../views/Search.vue')
  },
  {
    path: '/:cryptoId',
    name: 'CryptoView',
    component: () => import(/* webpackChunkName: "singleView" */ '../views/SingleView.vue')
  },
  {
    path: '*',
    name: '404',
    component: () => import(/* webpackChunkName: "singleView" */ '../views/404.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
