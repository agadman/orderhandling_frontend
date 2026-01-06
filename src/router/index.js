import { createRouter, createWebHistory } from 'vue-router'
import dashboardView from '@/views/dashboardView.vue'
import loginView from '@/views/loginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{
    path: '/',
    name: 'login',
    component: loginView,
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: dashboardView,
  }],
})

export default router
