// Layout
import MainLayout from 'src/layouts/MainLayout.vue'

// Pages
import HomeView from 'src/pages/HomeView.vue'
import OrganisationsView from 'src/pages/OrganisationsView.vue'
import OrganisationView from 'src/pages/OrganisationView.vue'
import TeamView from 'src/pages/TeamView.vue'
import TeamsView from 'src/pages/TeamsView.vue'
import AuthentificationView from 'src/pages/AuthentificationView.vue'
import LoginView from 'src/pages/LoginView.vue'
import RegisterView from 'src/pages/RegisterView.vue'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', name: 'home', component: HomeView },
      { path: 'login', name: 'login', component: LoginView },
      { path: 'register', name: 'register', component: RegisterView },
      { path: 'organisations', name: 'organisations', component: OrganisationsView },
      { path: 'organisation', name: 'organisation', component: OrganisationView },
      { path: 'team', name: 'team', component: TeamView },
      { path: 'teams', name: 'teams', component: TeamsView },
      { path: 'authentification', name: 'authentification', component: AuthentificationView },
    ],
  },
]

export default routes;
