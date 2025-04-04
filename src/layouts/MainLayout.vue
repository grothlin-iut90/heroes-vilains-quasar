<template>
  <q-layout view="hHh lpR fFf">
    <NavBar></NavBar>
    <q-dialog v-model="errorDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Erreur</div>
        </q-card-section>
        <q-card-section>{{ errorMessage }}</q-card-section>
        <q-card-actions align="right">
          <q-btn color="negative" flat @click="clearError">Fermer</q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script setup>
import { computed } from 'vue'
import NavBar from 'src/components/NavBar.vue'
import { useErrorStore } from 'src/stores/modules/errors'

const errorStore = useErrorStore()

const errorMessage = computed(() => errorStore.errorMessage)
const errorDialog = computed(() => !!errorStore.errorMessage)

const clearError = () => {
  errorStore.clearError()
}
</script>

<style>
</style>
