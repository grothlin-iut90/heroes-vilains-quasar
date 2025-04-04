<script>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router' // Import useRouter
import { useSecretStore } from 'src/stores/modules/secret'

export default {
  name: 'NavBar',
  setup() {
    const drawer = ref(false)
    const showPassword = ref(false)
    const organisationPasswordStore = useSecretStore()
    const router = useRouter() // Initialize the router

    // Define a writable computed property
    const organisationPassword = computed({
      get: () => organisationPasswordStore.OrganisationPassword,
      set: (value) => organisationPasswordStore.setOrganisationPassword(value),
    })

    const redirectToLogin = () => {
      router.push('/login')
    }

    return {
      drawer,
      showPassword,
      organisationPassword,
      redirectToLogin,
    }
  },
}
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <q-drawer v-model="drawer" show-if-above>
      <q-list>
        <q-item clickable v-ripple to="/organisations">
          <q-item-section avatar>
            <q-icon name="domain" />
          </q-item-section>
          <q-item-section>Organisations</q-item-section>
        </q-item>
        <q-item clickable v-ripple to="/teams">
          <q-item-section avatar>
            <q-icon name="group" />
          </q-item-section>
          <q-item-section>Équipes</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-header>
      <q-toolbar>
        <q-btn flat round dense icon="menu" @click="drawer = !drawer" />
        <q-toolbar-title>HeroesAndVilains</q-toolbar-title>
        <q-input
          v-model="organisationPassword"
          label="Votre phrase secrète"
          type="password"
          :append="showPassword ? 'visibility' : 'visibility_off'"
          @click:append="showPassword = !showPassword"
          dense
          outlined
        />
        <q-btn label="Se connecter" @click="redirectToLogin" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
