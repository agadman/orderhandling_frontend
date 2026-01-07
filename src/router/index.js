import { createRouter, createWebHistory } from 'vue-router'
import dashboardView from '@/views/dashboardView.vue'
import loginView from '@/views/loginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: loginView,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: dashboardView,
      meta: { requiresAuth: true } 
    },
  ],
})

router.beforeEach(async (to) => {
  if (!to.meta.requiresAuth) return true;

  try {
    const res = await fetch('http://localhost:3000/auth/me', {
      method: 'GET',
      credentials: 'include'
    });

    if (res.ok) return true;
    return { name: 'login' };
  } catch (err) {
    return { name: 'login' };
  }
});

export default router