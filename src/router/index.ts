import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Calander',
    component: () => import(/* webpackChunkName: "about" */ '../views/calander.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
