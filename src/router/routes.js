import { createRouter, createWebHistory } from "vue-router";
import { getActivePinia } from 'pinia'
import HomeView from "../views/HomeView.vue";
import OrganisationsView from "../views/OrganisationsView.vue";
import OrganisationView from "@/views/OrganisationView.vue";
import TeamView from "@/views/TeamView.vue";
import TeamsView from "@/views/TeamsView.vue";
import AuthentificationView from "@/views/AuthentificationView.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";

const routes = [
    {
        path: "/",
        name: "home",
        component: HomeView,
    },
    {
        path: "/login",
        name: "login",
        component: LoginView,
    },
    {
        path: "/register",
        name: "register",
        component: RegisterView,
    },
    {
        path: "/organisations",
        name: "organisations",
        component: OrganisationsView,
    },
    {
        path: "/organisation",
        name: "organisation",
        component: OrganisationView,
    },
    {
        path: "/team",
        name: "team",
        component: TeamView,
    },
    {
        path: "/teams",
        name: "teams",
        component: TeamsView,
    },
    {
        path: "/authentification",
        name: "authentification",
        component: AuthentificationView,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    // Récupérer le pinia actif et accéder au store
    const pinia = getActivePinia();
    const isAuthenticated = pinia ? pinia.state.value.auth.isAuthenticated : false;
    
    if (to.name !== "login" && to.name !== "register" && !isAuthenticated) {
        next({ name: "login" });
    } else {
        next();
    }
});

export default router;