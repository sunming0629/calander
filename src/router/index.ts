import { createRouter, createMemoryHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Calander',
    component: () => import(/* webpackChunkName: "about" */ '../views/calander.vue')
  }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes
})

export default router
