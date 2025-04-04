import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from 'src/stores/modules/auth'
import routes from './routes.js'

const router = createRouter({
  history: createWebHistory(),
  routes, // Use the imported routes array
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore(); // Access the auth store
  const isAuthenticated = authStore.isAuthenticated;

  if (to.name !== "login" && to.name !== "register" && !isAuthenticated) {
    next({ name: "login" });
  } else {
    next();
  }
});

export default router
