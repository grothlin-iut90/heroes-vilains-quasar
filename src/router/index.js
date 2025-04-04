import { createRouter, createWebHistory } from 'vue-router'
// import { getActivePinia } from 'pinia'
import routes from './routes.js'

const router = createRouter({
  history: createWebHistory(),
  routes, // Use the imported routes array
});

// router.beforeEach((to, from, next) => {
//   const pinia = getActivePinia();
//   const isAuthenticated = pinia ? pinia.state.value.auth.isAuthenticated : false;

//   if (to.name !== "login" && to.name !== "register" && !isAuthenticated) {
//       next({ name: "login" });
//   } else {
//       next();
//   }
// });

export default router
