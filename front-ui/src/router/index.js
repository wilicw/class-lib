import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/book/:id',
    name: 'Book',
    component: () => import('../views/Book.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
