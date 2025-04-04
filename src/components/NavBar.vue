<script>
import { ref, computed } from "vue";
import { useOrganisationPasswordStore } from "@/store/modules/secret";

export default {
  name: "NavBar",
  setup() {
    const drawer = ref(false);
    const showPassword = ref(false);
    const organisationPasswordStore = useOrganisationPasswordStore();

    const organisationPassword = computed(() => organisationPasswordStore.OrganisationPassword);

    const updateSecret = (value) => {
      organisationPasswordStore.setOrganisationPassword(value);
    };

    return {
      drawer,
      showPassword,
      organisationPassword,
      updateSecret,
    };
  },
};
</script>

<template>
  <q-layout-drawer v-model="drawer" show-if-above>
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
  </q-layout-drawer>

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
      <q-btn label="Se connecter" />
    </q-toolbar>
  </q-header>
</template>