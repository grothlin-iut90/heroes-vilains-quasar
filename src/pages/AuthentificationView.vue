<template>
  <div class="AuthentificationView">
    <h1>Authentification</h1>
    <h3>Votre phrase secrète:</h3>
    <input type="text" v-model="secretPhrase" />
    <button @click="setOrganisationPassword">Valider</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useSecretStore } from 'src/stores/modules/secret'

const secretPhrase = ref('')
const organisationPasswordStore = useSecretStore()

const setOrganisationPassword = () => {
  organisationPasswordStore.setOrganisationPassword(secretPhrase.value)
}
</script>
