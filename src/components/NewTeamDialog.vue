<script setup>
import { ref, computed } from 'vue';
import { useGeneralStore } from 'src/stores/modules/general';

// Pinia store
const generalStore = useGeneralStore();

// Reactive state
const dialog = ref(false);
const teamName = ref('');

// Expose the dialog property to parent components
defineExpose({ dialog });

// Computed properties
const isFormValid = computed(() => teamName.value.length > 0);

const cancel = () => {
  dialog.value = false;
  teamName.value = '';
};

const valid = async () => {
  dialog.value = false;
  await generalStore.createTeam({ name: teamName.value });
  teamName.value = '';
};
</script>

<template>
  <q-dialog v-model="dialog" persistent>
    <q-card>
      <q-card-section>
        <div class="text-h6">Nouvelle équipe</div>
      </q-card-section>
      <q-card-section>
        <q-input
          v-model="teamName"
          label="Entrez le nom de l'équipe"
          filled
        />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Annuler" color="negative" @click="cancel" />
        <q-btn
          flat
          label="Valider"
          color="positive"
          :disable="!isFormValid"
          @click="valid"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped>
/* Add any scoped styles here if needed */
</style>