<template>
  <div class="AuthentificationView">
    <h1>Authentification</h1>
    <h3>Votre phrase secrète: </h3>
    <input type="text" v-model="secretPhrase" />
    <button @click="setOrganisationPassword">Valider</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useOrganisationPasswordStore } from "@/store/modules/secret";

const secretPhrase = ref("");
const organisationPasswordStore = useOrganisationPasswordStore();

const setOrganisationPassword = () => {
  organisationPasswordStore.setOrganisationPassword(secretPhrase.value);
};
</script>