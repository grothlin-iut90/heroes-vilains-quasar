<template>
  <q-layout view="hHh lpR fFf">
    <NavBar></NavBar>
    <q-page-container>
      <router-view />
    </q-page-container>
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
import { computed } from "vue";
import NavBar from "@/components/NavBar.vue";
import { useErrorStore } from "@/store/modules/errors";

const errorStore = useErrorStore();

const errorMessage = computed(() => errorStore.errorMessage);
const errorDialog = computed(() => !!errorStore.errorMessage);

const clearError = () => {
  errorStore.clearError();
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
